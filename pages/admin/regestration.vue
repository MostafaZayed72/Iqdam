<template>
  <div class="p-6">
    <div class="flex mb-4 justify-between">
      <h1 class="text-2xl font-bold">إدارة التسجيلات</h1>
      <LogoutButton />
    </div>

    <!-- شريط البحث -->
    <div class="flex items-center mb-4">
      <input
        v-model="search"
        @keyup.enter="fetchStudents"
        type="text"
        placeholder="ابحث بالاسم أو الهاتف"
        class="border p-2 rounded w-64"
      />
      <button
        @click="fetchStudents"
        class="ml-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        بحث
      </button>
    </div>

    <!-- جدول الطلاب -->
    <div class="overflow-x-auto">
      <table class="w-full border text-sm min-w-[900px]">
        <thead class="bg-gray-100">
          <tr>
            <th v-for="key in tableHeaders" :key="key" class="border p-2">
              {{ getLabel(key) }}
            </th>
            <th class="border p-2">إجراءات</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="student in students" :key="student.id">
            <td v-for="key in tableHeaders" :key="key" class="border p-2 text-center">
              <!-- صورة -->
              <img
                v-if="key === 'profilePictureUrl' && student[key]"
                :src="student[key]"
                class="w-12 h-12 rounded-full object-cover mx-auto"
              />
              <!-- تواريخ -->
              <span v-else-if="key.toLowerCase().includes('date')">
                {{ new Date(student[key]).toLocaleDateString() }}
              </span>
              <!-- باقي الأعمدة -->
              <span v-else>
                {{ student[key] }}
              </span>
            </td>
            <td class="border p-2 text-center">
              <button
                @click="openEditDialog(student)"
                class="px-2 py-1 bg-yellow-500 text-white rounded mr-2"
              >
                تعديل
              </button>
              <button
                @click="deleteStudent(student.id)"
                class="px-2 py-1 bg-red-600 text-white rounded"
              >
                حذف
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- الصفحات -->
    <div class="flex justify-between items-center mt-4">
      <button
        :disabled="pageNumber <= 1"
        @click="pageNumber--; fetchStudents()"
        class="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
      >
        السابق
      </button>
      <span>صفحة {{ pageNumber }} من {{ totalPages }}</span>
      <button
        :disabled="pageNumber >= totalPages"
        @click="pageNumber++; fetchStudents()"
        class="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
      >
        التالي
      </button>
    </div>

    <!-- نافذة التعديل -->
    <dialog v-if="editDialog" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
      <div class="bg-white p-6 rounded w-full max-w-lg">
        <h2 class="text-xl font-bold mb-4">تعديل بيانات الطالب</h2>

        <div class="grid grid-cols-2 gap-4">
          <input v-for="key in editableKeys" :key="key" v-model="editForm[key]" :placeholder="getLabel(key)" class="border p-2 rounded" />
        </div>

        <div class="mt-6 flex justify-end space-x-2">
          <button @click="editDialog = false" class="px-4 py-2 bg-gray-300 rounded">إلغاء</button>
          <button @click="updateStudent" class="px-4 py-2 bg-blue-600 text-white rounded">حفظ</button>
        </div>
      </div>
    </dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'

const config = useRuntimeConfig()
const students = ref([])
const tableHeaders = ref([])

const totalPages = ref(1)
const pageNumber = ref(1)
const pageSize = ref(5)
const search = ref('')

// تعديل
const editDialog = ref(false)
const editForm = reactive({})
const editableKeys = ref([])

// 🟢 تحميل الطلاب
const fetchStudents = async () => {
  const authToken = localStorage.getItem('authToken')
  try {
    const res = await $fetch('/api/StudentProfiles/GetAllMatching', {
      baseURL: config.public.baseUrl,
      method: 'GET',
      headers: { Authorization: `Bearer ${authToken}` },
      params: {
        PageNumber: pageNumber.value,
        PageSize: pageSize.value,
        Search: search.value,
      },
    })

    students.value = res.items
    totalPages.value = res.totalPages

    if (res.items.length > 0) {
      const keys = Object.keys(res.items[0]).filter(k => k !== 'id')

      // ✅ ترتيب الأعمدة
      const ordered = ['profilePictureUrl', 'studentName', 'guardianName']
      const rest = keys.filter(k => !ordered.includes(k))
      tableHeaders.value = [...ordered, ...rest]

      editableKeys.value = tableHeaders.value.filter(k => !['createdAt', 'updatedAt', 'profilePictureUrl'].includes(k))
    }
  } catch (err) {
    console.error('خطأ في تحميل الطلاب', err)
  }
}

// 🟢 فتح نافذة التعديل
const openEditDialog = (student) => {
  Object.assign(editForm, student)
  editDialog.value = true
}

// 🟢 تحديث طالب
const updateStudent = async () => {
  const authToken = localStorage.getItem('authToken')
  try {
    await $fetch('/api/StudentProfiles/Update', {
      baseURL: config.public.baseUrl,
      method: 'PATCH',
      headers: { Authorization: `Bearer ${authToken}` },
      body: editForm,
    })
    editDialog.value = false
    fetchStudents()
  } catch (err) {
    console.error('فشل التعديل', err)
  }
}

// 🟢 حذف طالب
const deleteStudent = async (id) => {
  const authToken = localStorage.getItem('authToken')
  if (!confirm('هل تريد حذف هذا الطالب؟')) return
  try {
    await $fetch('/api/StudentProfiles/Delete', {
      baseURL: config.public.baseUrl,
      method: 'DELETE',
      headers: { Authorization: `Bearer ${authToken}` },
      body: { id },
    })
    fetchStudents()
  } catch (err) {
    console.error('فشل الحذف', err)
  }
}

// 🟢 ترجمة أسماء الأعمدة
const getLabel = (key) => {
  const labels = {
    studentName: "اسم الطالب",
    guardianName: "اسم ولي الأمر",
    primaryPhoneNumber: "الهاتف الأساسي",
    backupPhoneNumber: "الهاتف الاحتياطي",
    nationality: "الجنسية",
    email: "البريد الإلكتروني",
    grade: "الصف",
    profilePictureUrl: "الصورة",
    currentResidence: "مكان الإقامة",
    dateOfBirth: "تاريخ الميلاد",
    age: "العمر",
    createdAt: "تاريخ الإنشاء",
    updatedAt: "آخر تحديث"
  }
  return labels[key] || key
}

onMounted(fetchStudents)
</script>
