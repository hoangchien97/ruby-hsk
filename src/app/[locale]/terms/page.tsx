import {getTranslations} from 'next-intl/server';
import {LegalPage} from '@/components/legal/legal-page';
export default async function TermsPage(){ const t=await getTranslations('Legal'); return <LegalPage title={t('terms')} sections={['Chấp nhận điều khoản','Dịch vụ của Ruby HSK','Tài khoản người dùng','Đăng ký khóa học','Thanh toán và hoàn phí','Quy định học tập','Quyền sở hữu nội dung','Giới hạn trách nhiệm','Thay đổi điều khoản','Liên hệ']} />; }
