export const portfolioTheme = {
  heroOverlay: 'bg-gradient-to-b from-transparent via-[#000]/60 to-[#000]',
  titleColor: 'text-[#e0e0e0]',
  navBg: 'bg-[#0a0a0a]',
  navBorder: 'border-[#333]',
  navLinkBorder: 'border-[#222]',
  navLinkText: 'text-[#888]',
  navLinkHover: 'hover:text-[#ff1a1a] hover:border-[#ff1a1a]',
  navLinkBg: 'bg-[#111]',
  cardBg: 'bg-[#050505]',
  cardBorder: 'border-[#222]',
  sectionIconBg: 'bg-[#111]',
  sectionIconColor: 'text-[#ff1a1a]',
  sectionTitle: 'text-[#e0e0e0]',
  dashedBorder: 'border-[#333]',
  footerBorder: 'border-[#222]',
  footerBg: 'bg-[#0a0a0a]',
  footerText: 'text-[#555]',
  btnBg: 'bg-[#050505]',
  btnBorder: 'border-[#ff1a1a]',
  btnText: 'text-[#ff1a1a]',
  btnHoverBg: 'hover:bg-[#ff1a1a]',
  btnHoverText: 'group-hover:text-[#000]',
  btnAccent: 'text-[#ff1a1a]',
  btnAccentHover: 'group-hover:text-[#000]',
};

export const getStatusTheme = () => {
  const c = {
    bg: 'bg-[#111]',
    border: 'border-[#333]',
    textPrimary: 'text-[#e0e0e0]',
    textSecondary: 'text-[#888]',
    online: 'bg-green-600',
    idle: 'bg-yellow-600',
    dnd: 'bg-red-600',
    offline: 'bg-gray-600',
    icon: 'text-[#666]',
    divider: 'via-[#333]'
  };

  return { c, isGoth: true };
};
