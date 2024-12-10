export interface Photo {
  id: number
  url: string
  title: string
  description: string
  location: string
  date: string
}

export interface Album {
  id: number
  name: string
  cover: string
  description: string
  photos: Photo[]
}

export const albums: Album[] = [
  {
    id: 1,
    name: '家庭相册',
    cover: 'https://picsum.photos/1920/1080?random=cover1',
    description: '记录美好家庭时光',
    photos: Array.from({ length: 8 }, (_, index) => ({
      id: index + 1,
      url: `https://picsum.photos/1920/1080?random=1-${index + 1}`,
      title: `家庭照片 ${index + 1}`,
      description: '温馨的家庭时光，记录生活中的每一个精彩瞬间。',
      location: '杭州市西湖区',
      date: `2024-03-${String(index + 1).padStart(2, '0')}`
    }))
  },
  {
    id: 2,
    name: '旅行记忆',
    cover: 'https://picsum.photos/1920/1080?random=cover2',
    description: '探索世界的足迹',
    photos: Array.from({ length: 12 }, (_, index) => ({
      id: index + 1,
      url: `https://picsum.photos/1920/1080?random=2-${index + 1}`,
      title: `旅行照片 ${index + 1}`,
      description: '在旅途中发现美景，留下难忘的回忆。',
      location: '丽江古城',
      date: `2024-02-${String(index + 1).padStart(2, '0')}`
    }))
  },
  {
    id: 3,
    name: '美食日记',
    cover: 'https://picsum.photos/1920/1080?random=cover3',
    description: '舌尖上的美味时光',
    photos: Array.from({ length: 10 }, (_, index) => ({
      id: index + 1,
      url: `https://picsum.photos/1920/1080?random=3-${index + 1}`,
      title: `美食照片 ${index + 1}`,
      description: '记录每一道美味佳肴，分享烹饪的快乐。',
      location: '杭州市上城区',
      date: `2024-01-${String(index + 1).padStart(2, '0')}`
    }))
  },
  {
    id: 4,
    name: '宠物相册',
    cover: 'https://picsum.photos/1920/1080?random=cover4',
    description: '可爱萌宠的日常',
    photos: Array.from({ length: 15 }, (_, index) => ({
      id: index + 1,
      url: `https://picsum.photos/1920/1080?random=4-${index + 1}`,
      title: `宠物照片 ${index + 1}`,
      description: '记录爱宠的每一个可爱瞬间。',
      location: '家',
      date: `2024-03-${String(index + 1).padStart(2, '0')}`
    }))
  },
  {
    id: 5,
    name: '园艺日志',
    cover: 'https://picsum.photos/1920/1080?random=cover5',
    description: '绿植养护与花艺创作',
    photos: Array.from({ length: 6 }, (_, index) => ({
      id: index + 1,
      url: `https://picsum.photos/1920/1080?random=5-${index + 1}`,
      title: `园艺照片 ${index + 1}`,
      description: '记录植物生长的点点滴滴，分享园艺的乐趣。',
      location: '阳台花园',
      date: `2024-03-${String(index + 1).padStart(2, '0')}`
    }))
  }
] 
