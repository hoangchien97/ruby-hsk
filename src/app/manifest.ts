import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Ruby HSK - Học Tiếng Trung & Luyện Thi HSK',
    short_name: 'Ruby HSK',
    description:
      'Trung tâm dạy tiếng Trung và luyện thi HSK cùng cô Trần Hồng Ngọc. Lộ trình rõ ràng, lớp nhỏ, phương pháp nhẹ nhàng.',
    start_url: '/vi',
    display: 'standalone',
    background_color: '#fdf9f4',
    theme_color: '#b52330',
    orientation: 'portrait',
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'any',
      },
    ],
    lang: 'vi',
    categories: ['education'],
  };
}
