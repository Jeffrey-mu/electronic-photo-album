<template>
  <div class="admin-view">
    <el-container>
      <el-header>
        <div class="header-content">
          <h2>相册管理后台</h2>
          <el-button type="primary" @click="addNewAlbum">
            <el-icon><Plus /></el-icon>新建相册
          </el-button>
        </div>
      </el-header>
      
      <el-main>
        <el-tabs v-model="activeTab" type="border-card">
          <el-tab-pane label="相册列表" name="albums">
            <el-table :data="albumList" style="width: 100%">
              <el-table-column prop="id" label="ID" width="80" />
              <el-table-column prop="name" label="相册名称" width="180" />
              <el-table-column prop="description" label="描述" />
              <el-table-column label="封面" width="180">
                <template #default="{ row }">
                  <el-image
                    :src="row.cover"
                    fit="cover"
                    style="width: 100px; height: 75px"
                  />
                </template>
              </el-table-column>
              <el-table-column label="照片数量" width="100">
                <template #default="{ row }">
                  {{ row.photos.length }}
                </template>
              </el-table-column>
              <el-table-column label="操作" width="200">
                <template #default="{ row }">
                  <el-button-group>
                    <el-button size="small" @click="editAlbum(row)">
                      编辑
                    </el-button>
                    <el-button 
                      size="small" 
                      type="danger" 
                      @click="deleteAlbum(row)"
                    >
                      删除
                    </el-button>
                  </el-button-group>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </el-main>
    </el-container>

    <!-- 相册编辑对话框 -->
    <el-dialog
      v-model="dialogVisible"
      :title="editingAlbum.id ? '编辑相册' : '新建相册'"
      width="90%"
    >
      <el-form :model="editingAlbum" label-width="100px">
        <el-form-item label="相册名称">
          <el-input v-model="editingAlbum.name" />
        </el-form-item>
        <el-form-item label="描述">
          <el-input
            v-model="editingAlbum.description"
            type="textarea"
            :rows="2"
          />
        </el-form-item>
        <el-form-item label="封面">
          <el-input v-model="editingAlbum.cover" />
          <el-image
            v-if="editingAlbum.cover"
            :src="editingAlbum.cover"
            style="width: 200px; margin-top: 10px"
          />
        </el-form-item>

        <el-divider>照片列表</el-divider>
        
        <div class="photos-editor">
          <el-button @click="addPhoto" style="margin-bottom: 20px">
            <el-icon><Plus /></el-icon>添加照片
          </el-button>
          
          <el-table :data="editingAlbum.photos" style="width: 100%">
            <el-table-column type="index" width="50" />
            <el-table-column prop="title" label="标题">
              <template #default="{ row }">
                <el-input v-model="row.title" />
              </template>
            </el-table-column>
            <el-table-column prop="url" label="图片URL">
              <template #default="{ row }">
                <el-input v-model="row.url" />
              </template>
            </el-table-column>
            <el-table-column prop="location" label="位置">
              <template #default="{ row }">
                <el-input v-model="row.location" />
              </template>
            </el-table-column>
            <el-table-column prop="date" label="日期">
              <template #default="{ row }">
                <el-date-picker
                  v-model="row.date"
                  type="date"
                  value-format="YYYY-MM-DD"
                />
              </template>
            </el-table-column>
            <el-table-column label="操作" width="100">
              <template #default="{ $index }">
                <el-button 
                  type="danger" 
                  circle
                  size="small"
                  @click="removePhoto($index)"
                >
                  <el-icon><Delete /></el-icon>
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-form>
      
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="saveAlbum">
            保存
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { ElMessageBox, ElMessage } from 'element-plus'
import { Plus, Delete } from '@element-plus/icons-vue'
import { albums } from '@/config/albums'
import type { Album, Photo } from '@/config/albums'

const activeTab = ref('albums')
const dialogVisible = ref(false)
const albumList = ref(albums)

const emptyAlbum: Album = {
  id: 0,
  name: '',
  cover: '',
  description: '',
  photos: []
}

const editingAlbum = reactive({ ...emptyAlbum })

const addNewAlbum = () => {
  Object.assign(editingAlbum, {
    ...emptyAlbum,
    id: Math.max(0, ...albumList.value.map(a => a.id)) + 1
  })
  dialogVisible.value = true
}

const editAlbum = (album: Album) => {
  Object.assign(editingAlbum, JSON.parse(JSON.stringify(album)))
  dialogVisible.value = true
}

const deleteAlbum = (album: Album) => {
  ElMessageBox.confirm(
    '确定要删除这个相册吗？此操作不可恢复。',
    '警告',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }
  ).then(() => {
    const index = albumList.value.findIndex(a => a.id === album.id)
    if (index > -1) {
      albumList.value.splice(index, 1)
      ElMessage.success('删除成功')
    }
  })
}

const addPhoto = () => {
  const newPhoto: Photo = {
    id: Math.max(0, ...editingAlbum.photos.map(p => p.id)) + 1,
    url: '',
    title: '新照片',
    description: '',
    location: '',
    date: new Date().toISOString().split('T')[0]
  }
  editingAlbum.photos.push(newPhoto)
}

const removePhoto = (index: number) => {
  editingAlbum.photos.splice(index, 1)
}

const saveAlbum = () => {
  if (!editingAlbum.name.trim()) {
    ElMessage.warning('请输入相册名称')
    return
  }

  const index = albumList.value.findIndex(a => a.id === editingAlbum.id)
  if (index > -1) {
    albumList.value[index] = JSON.parse(JSON.stringify(editingAlbum))
  } else {
    albumList.value.push(JSON.parse(JSON.stringify(editingAlbum)))
  }
  
  dialogVisible.value = false
  ElMessage.success('保存成功')
}
</script>

<style scoped lang="scss">
.admin-view {
  min-height: 100vh;
  background: #f5f7fa;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  padding: 0 20px;
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  
  h2 {
    margin: 0;
    font-weight: 500;
    color: #303133;
  }
}

.el-main {
  padding: 20px;
}

.photos-editor {
  margin: 20px 0;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 4px;
}

:deep(.el-dialog__body) {
  padding: 20px;
  max-height: calc(100vh - 200px);
  overflow-y: auto;
}
</style>
