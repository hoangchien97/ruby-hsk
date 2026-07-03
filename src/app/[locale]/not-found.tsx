import {useTranslations} from 'next-intl';
import {Button} from '@/components/ui/button';
import {Link} from '@/i18n/navigation';
import {LogoIcon} from '@/components/logo/logo-icon';
export default function NotFound(){const t=useTranslations('NotFound');return <section className="container grid min-h-[65vh] place-items-center pt-14"><div className="glass-card max-w-xl rounded-[2rem] p-10 text-center"><LogoIcon className="mx-auto h-20 w-20"/><h1 className="mt-6 text-4xl font-black text-[var(--color-title)]">{t('title')}</h1><p className="mt-4 text-[var(--color-muted)]">{t('sub')}</p><Link href="/"><Button className="mt-6">Về trang chủ</Button></Link></div></section>}
