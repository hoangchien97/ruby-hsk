import {getTranslations} from 'next-intl/server';
import {LegalPage} from '@/components/legal/legal-page';
export default async function PrivacyPage(){ const t=await getTranslations('Legal'); return <LegalPage title={t('privacy')} sections={['Thông tin chúng tôi thu thập','Mục đích sử dụng thông tin','Bảo mật dữ liệu','Chia sẻ thông tin','Cookies và công nghệ theo dõi','Quyền của người dùng','Thời gian lưu trữ dữ liệu','Liên hệ về bảo mật']} />; }
