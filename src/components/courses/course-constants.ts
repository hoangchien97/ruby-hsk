export const AVATARS = [
    'https://lh3.googleusercontent.com/aida-public/AB6AXuD4fPOZ6z6CmoWXRBBBoih66Mzxw43Lqk_xGfIQzow4MdNWuSyJvC-ChNGy2jjpguIB91PuGr4A34YvmcCOU0HtJc--mXrI1xoMicHVSnfW2-cF50xMIZQqSAqa643tL2EdP_CNUfvoVwbWuXaiBzyDQiRquBFTp1M_UQUa3UV4aNjD48Ogw3nTYDoodm1iNrban0RXcfBucorpELcuUm4_2w6ymPC0-gF7QcekQEU16dNZTnUqDtpOBOyGhocC-coK8U2eh_u4Jlc',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDdCqh9Q0x77zLYs0IUXLcrq87LbvqE5hKFE4-01NYemsJe8JVmgdaLDcrMJdttXMK_aErbS5lCljC1SceB9vowg4y2BRg8Ia5cVwBi4_kodtXK0iukU7u97fKYYPyRJ_3C-s-OMeEBrm8xAESvdvyxhHPU1hoMpJMA9XyGptlxkXsWvaO023d1FJ2jZAA00COaUARROn5WTFuuMVI4c57SNKufokAmwDxSglj6Kc-AakRk_BFFMW5G_F3pWYK9VtRMUvja-VMze9o',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuACT33xlbhf8B5Tg0nDhH2C5g9zq12lZLCjyaOeX7025fPiHA-WtHS4prfbzyuE7Ddj7SZ_8BFFqIawI5Xg-i-STr0LjAhhfOqMbq2MF1u5nj-teMhdOanPmFr9a3sWm_cC8BhRoQ2kAsfCXzm63wbqn6anNNiCnnjbGu8fGrQ6XR-rSS6zP31xmYMMxiEId_pEeOF-5PyS8gOSCTOQwhkvBMsIZK9SnJ863GajofFvxOZk1WQEcdWcdAzFSN2-nk14D_iakJ5N9pM',
];

const COVER_A =
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBvBTDpKBKo3KwpzbOOJf6xz-axCjUgQh33SsZCNDz9tGu_Faj_EiNPO79Sdd2diH1dKQ74b4y5KlIUQz0QYdRoSpRlWsV7CjKLlIwqzt6sdVDx22u0FY-ha96yBBxquL-41vJAE5_WnKxBmtx7j37s2rL9j7ra8dR8MNcsLlVpp3yX-JpvYnH860OIuFWuOEyrcEf23X-E3Z832jtzuo9wz6KQCybLALhOkW6pn-o5CVVD-MW5nQ40S4y8lB9L6MOZPLS4LVGWK2E';
const COVER_B =
    'https://lh3.googleusercontent.com/aida-public/AB6AXuA23Y3SFWaZP-Ro_dUvOyYG-X5IkTeRDuYfRGw9X3zZmykkS1NMQ5sG8tkzT_HokcHz_2AHCTppablTIFb5WLRShllqVnrmmLCCxTFKzcS2znbfo8PtUxeGNqeqvQBlluckFP13YenSGn_TXHaz5mRQags4U5pdC4KWo1zlwiF5gJ0W9Xbsx8VUGQ1EabmcsAqaOGHDyfXvOAy6vZrF137vzFGpQFzTy_KmVlS1O79DLf_jsJmBW6bo7bL_TuZPPJ9VzM7Zz9udC2E';
const COVER_C =
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAxOJLYiku05WccysCZ_WUYIkPCNQHGOv7SNfxiCCk1gf5KQ_7SosySsu7uHbiPOY2F0ozfM-08H77LKU1xBZ8JtWnWyDsWPx1MAgz_8xBPRBQR0V6xmj6AhST57erNx1aGDSnmuTzfjz2-0aVZexI6nIjgiaPLkBg1SlwkBl1KrvFEWLgZBgmVrpOkzJUnGNMp3CTG0ISOPF_dGi7TbRN4CKJ254AynxJiqCTgI1ohuiVoaPWLr8TrvXLKYzVPU9hgExQEgMk2ONk';

/** Cover images for the 6 HSK-level courses. Only 3 unique Stitch source images exist, so they're reused. */
export const COURSE_COVERS: Record<string, string> = {
    'hsk-1': COVER_A,
    'hsk-2': COVER_B,
    'hsk-3': COVER_C,
    'hsk-4': COVER_A,
    'hsk-5': COVER_B,
    'hsk-6': COVER_C,
};

export const FALLBACK_COVER = COVER_A;

/**
 * Lecture/session counts per HSK level — sourced from the live reference
 * (ruby-hsk.vercel.app/courses), not yet columns on the `courses` table.
 */
export const COURSE_STATS: Record<string, { lectures: number; sessions: number }> = {
    'hsk-1': { lectures: 15, sessions: 25 },
    'hsk-2': { lectures: 15, sessions: 25 },
    'hsk-3': { lectures: 20, sessions: 30 },
    'hsk-4': { lectures: 20, sessions: 30 },
    'hsk-5': { lectures: 25, sessions: 35 },
    'hsk-6': { lectures: 25, sessions: 35 },
};
