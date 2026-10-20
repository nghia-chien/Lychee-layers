export interface NavLink {
  readonly label: string;
  readonly href: string;
}

export interface HeroCard {
  readonly id: string;
  readonly title: string;
  readonly caption: string;
  readonly image: string;
  readonly rotation: string;
  readonly zIndex: number;
}

export interface ConceptItem {
  readonly id: string;
  readonly index: string;
  readonly title: string;
  readonly tag: string;
  readonly description: string;
  readonly image: string;
  readonly hoverImage?: string;
  readonly hoverCaption?: string;
}

export interface GalleryItem {
  readonly id: string;
  readonly title: string;
  readonly category: string;
  readonly year: string;
  readonly image: string;
  readonly aspect: string;
}

export interface ExperienceStep {
  readonly number: string;
  readonly title: string;
  readonly description: string;
}

export interface MoodTab {
  readonly id: string;
  readonly label: string;
}

export interface LookbookItem {
  readonly id: string;
  readonly title: string;
  readonly mood: 'all' | 'romance' | 'muse' | 'vintage' | 'cocktail' | 'urban';
  readonly moodLabel: string;
  readonly image: string;
  readonly aspect: string;
  readonly caption: string;
  readonly details: string;
  readonly tags: readonly string[];
}

export interface CollectionPhoto {
  readonly id: string;
  readonly image: string;
  readonly title: string;
  readonly caption: string;
  readonly aspect: string;
  readonly role: 'lead' | 'detail' | 'portrait' | 'candid';
  readonly tag: string;
}

export interface EditorialCollection {
  readonly id: string;
  readonly index: string;
  readonly volTag: string;
  readonly title: string;
  readonly titleItalic: string;
  readonly mood: string;
  readonly description: string;
  readonly artDirectionNote: string;
  readonly palette: readonly string[];
  readonly photos: readonly CollectionPhoto[];
}

export interface PackageItem {
  readonly id: string;
  readonly name: string;
  readonly subtitle: string;
  readonly priceNotice: string;
  readonly badge?: string;
  readonly isPopular?: boolean;
  readonly features: readonly string[];
}

export interface StudioInfo {
  readonly brandName: string;
  readonly brandTagline: string;
  readonly logoUrl: string;
  readonly logoLightUrl: string;
  readonly heroTitleLine1: string;
  readonly heroTitleLine2: string;
  readonly heroDescription: string;
  readonly closingHeadline1: string;
  readonly closingHeadline2: string;
  readonly closingDescription: string;
  readonly addressNotice: string;
  readonly instagramHandle: string;
  readonly hotlineNotice: string;
  readonly workingHours: string;
}

export const studioInfo: StudioInfo = {
  brandName: "Lychee Layers",
  brandTagline: "Immersive Fashion Editorial Studio",
  logoUrl: "/logo.png",
  logoLightUrl: "/logo-white.png",
  heroTitleLine1: "Your Story,",
  heroTitleLine2: "Artfully Framed.",
  heroDescription:
    "Tôn vinh vẻ đẹp độc bản qua lăng kính nhiếp ảnh thời trang nghệ thuật. Mỗi khung hình mở ra như một trang tạp chí cao cấp dành riêng cho bạn.",
  closingHeadline1: "Your Story Starts Here.",
  closingHeadline2: "Để mỗi khung hình kể câu chuyện của riêng bạn.",
  closingDescription:
    "Hãy để Lychee Layers đồng hành cùng bạn tạo nên những khung hình vượt thời gian. Đặt lịch tư vấn moodboard và concept cùng Giám đốc nghệ thuật ngay hôm nay.",
  addressNotice: "Chung cư Ecogreen, block i, 39B Đường Nguyễn Văn Linh, Tân Thuận, Hồ Chí Minh, Việt Nam",
  instagramHandle: "@lycheelayers.studio",
  hotlineNotice: "0978 856 063",
  workingHours: "09:00 — 21:00 (Làm việc theo lịch hẹn)",
};

export interface FloatingCardData {
  readonly id: string;
  readonly image: string;
  readonly alt: string;
  readonly badge?: string; // handwritten accent e.g. "New Concept"
  readonly caption?: string; // e.g. "Portrait / Editorial"
  readonly rotation: string;
  readonly positionClass: string;
  readonly sizeClass: string;
  readonly zIndex: number;
}

export interface HeroSlide {
  readonly id: string;
  readonly index: string; // "01", "02", "03"
  readonly eyebrow: string;
  readonly headline: {
    readonly line1: string;
    readonly line2: string; // italic serif
    readonly line3: string;
  };
  readonly supportingCopy: string;
  readonly primaryCta: {
    readonly label: string;
    readonly href: string;
  };
  readonly mainImage: {
    readonly src: string;
    readonly alt: string;
    readonly caption?: string;
  };
  readonly floatingCards: readonly FloatingCardData[];
  readonly silkTone: 'rose' | 'champagne' | 'taupe';
}

export const navLinks: readonly NavLink[] = [
  { label: "Home", href: "#hero" },
  { label: "Concepts", href: "#concepts" },
  { label: "Portfolio", href: "#selected-works" },
  { label: "Studio", href: "#story" },
  { label: "Contact", href: "#booking" },
];

export const heroSlides: readonly HeroSlide[] = [
  {
    id: "hero-slide-1",
    index: "01",
    eyebrow: "PHOTOGRAPHY STUDIO",
    headline: {
      line1: "Your Story",
      line2: "Artfully",
      line3: "Framed",
    },
    supportingCopy: "Mỗi khung hình, một dấu ấn riêng.",
    primaryCta: {
      label: "Khám phá concept",
      href: "#concepts",
    },
    mainImage: {
      src: "/825269972_17990864232061701_2924908792487049322_n.jpg",
      alt: "Lychee Layers Contemporary Duo in Satin on Striped Sofa",
      caption: "Contemporary Duo — Vol. 01",
    },
    floatingCards: [
      {
        id: "fc-1-1",
        image: "/774668663_17985404445061701_6311156792851912271_n.jpg",
        alt: "New Concept editorial frame",
        badge: "New Concept",
        rotation: "-rotate-3",
        positionClass: "-top-6 -left-6 sm:-top-10 sm:-left-12 lg:-top-12 lg:-left-14",
        sizeClass: "w-[130px] sm:w-[170px] lg:w-[190px]",
        zIndex: 30,
      },
      {
        id: "fc-1-2",
        image: "/775245328_17985404463061701_5295672598680562023_n.jpg",
        alt: "Portrait Editorial close up",
        caption: "Portrait / Editorial",
        rotation: "rotate-3",
        positionClass: "-bottom-6 -right-6 sm:-bottom-8 sm:-right-8 lg:-bottom-10 lg:-right-10",
        sizeClass: "w-[125px] sm:w-[165px] lg:w-[185px]",
        zIndex: 30,
      },
      {
        id: "fc-1-3",
        image: "/776165610_17985404475061701_8767142822172335926_n.jpg",
        alt: "Next frame peek preview",
        rotation: "-rotate-2",
        positionClass: "top-1/4 -right-16 sm:-right-24 lg:-right-28 opacity-40 blur-[0.6px] pointer-events-none hidden sm:block",
        sizeClass: "w-[110px] sm:w-[145px] lg:w-[160px]",
        zIndex: 10,
      },
    ],
    silkTone: "rose",
  },
  {
    id: "hero-slide-2",
    index: "02",
    eyebrow: "EDITORIAL ATELIER",
    headline: {
      line1: "Poetic Light",
      line2: "Timelessly",
      line3: "Captured",
    },
    supportingCopy: "Nơi cảm xúc thăng hoa giữa lụa là và ánh nắng chiều.",
    primaryCta: {
      label: "Khám phá concept",
      href: "#concepts",
    },
    mainImage: {
      src: "/776165610_17985404475061701_8767142822172335926_n.jpg",
      alt: "Lychee Layers Buttercup Reverie on Vintage Daybed",
      caption: "Buttercup Reverie — Vol. 02",
    },
    floatingCards: [
      {
        id: "fc-2-1",
        image: "/778426496_17985404454061701_7225558674345568160_n.jpg",
        alt: "Sunlit Muse card",
        badge: "Sunlit Muse",
        rotation: "-rotate-2",
        positionClass: "-top-6 -left-6 sm:-top-10 sm:-left-12 lg:-top-12 lg:-left-14",
        sizeClass: "w-[130px] sm:w-[170px] lg:w-[190px]",
        zIndex: 30,
      },
      {
        id: "fc-2-2",
        image: "/765652706_17983487487061701_1719604522210793188_n.jpg",
        alt: "Minimalist Linen portrait",
        caption: "Minimalist / Muse",
        rotation: "rotate-2",
        positionClass: "-bottom-6 -right-6 sm:-bottom-8 sm:-right-8 lg:-bottom-10 lg:-right-10",
        sizeClass: "w-[125px] sm:w-[165px] lg:w-[185px]",
        zIndex: 30,
      },
      {
        id: "fc-2-3",
        image: "/838628556_17992080708061701_4705302932820354249_n.jpg",
        alt: "Next frame peek preview",
        rotation: "rotate-2",
        positionClass: "top-1/4 -right-16 sm:-right-24 lg:-right-28 opacity-40 blur-[0.6px] pointer-events-none hidden sm:block",
        sizeClass: "w-[110px] sm:w-[145px] lg:w-[160px]",
        zIndex: 10,
      },
    ],
    silkTone: "champagne",
  },
  {
    id: "hero-slide-3",
    index: "03",
    eyebrow: "HAUTE FASHION ARCHIVE",
    headline: {
      line1: "Bold Elegance",
      line2: "Gracefully",
      line3: "Defined",
    },
    supportingCopy: "Tuyên ngôn phong cách qua từng đường nét chiaroscuro.",
    primaryCta: {
      label: "Khám phá concept",
      href: "#concepts",
    },
    mainImage: {
      src: "/838628556_17992080708061701_4705302932820354249_n.jpg",
      alt: "Lychee Layers Polka Coquette on Royal Baroque Chair",
      caption: "French Coquette — Vol. 03",
    },
    floatingCards: [
      {
        id: "fc-3-1",
        image: "/833333732_17992080567061701_5562652851810593575_n.jpg",
        alt: "French Baroque accent",
        badge: "French Vibe",
        rotation: "-rotate-3",
        positionClass: "-top-6 -left-6 sm:-top-10 sm:-left-12 lg:-top-12 lg:-left-14",
        sizeClass: "w-[130px] sm:w-[170px] lg:w-[190px]",
        zIndex: 30,
      },
      {
        id: "fc-3-2",
        image: "/800979481_17990119317061701_7888932770581900000_n.jpg",
        alt: "Haute Structure card",
        caption: "Haute Noir / 2024",
        rotation: "rotate-3",
        positionClass: "-bottom-6 -right-6 sm:-bottom-8 sm:-right-8 lg:-bottom-10 lg:-right-10",
        sizeClass: "w-[125px] sm:w-[165px] lg:w-[185px]",
        zIndex: 30,
      },
      {
        id: "fc-3-3",
        image: "/825269972_17990864232061701_2924908792487049322_n.jpg",
        alt: "Next frame peek preview",
        rotation: "-rotate-1",
        positionClass: "top-1/4 -right-16 sm:-right-24 lg:-right-28 opacity-40 blur-[0.6px] pointer-events-none hidden sm:block",
        sizeClass: "w-[110px] sm:w-[145px] lg:w-[160px]",
        zIndex: 10,
      },
    ],
    silkTone: "taupe",
  },
];

export const heroCards: readonly HeroCard[] = [
  {
    id: "hero-1",
    title: "Portrait d'Art",
    caption: "Editorial Vol. 01 — Light & Silk",
    image: "/766075495_17983487520061701_1222515516559665240_n.jpg",
    rotation: "-rotate-2",
    zIndex: 20,
  },
  {
    id: "hero-2",
    title: "Satin Reverie",
    caption: "Fine Art Silhouette",
    image: "/825269972_17990864232061701_2924908792487049322_n.jpg",
    rotation: "rotate-3",
    zIndex: 10,
  },
  {
    id: "hero-3",
    title: "Poetic Gaze",
    caption: "Avant-Garde Mood",
    image: "/779167733_17985905124061701_3259760987923221280_n.jpg",
    rotation: "-rotate-1",
    zIndex: 5,
  },
];

export const brandStoryContent = {
  sectionTag: "01 / BRAND STORY",
  title: "Every Version of You",
  subtitle: "Nhiếp ảnh không chỉ ghi lại hình ảnh, mà đánh thức thần thái nguyên bản.",
  paragraphs: [
    "Tại Lychee Layers, chúng tôi tin rằng mỗi người phụ nữ đều sở hữu một chiều sâu cảm xúc chưa từng được bộc lộ trọn vẹn. Bạn không cần phải là người mẫu chuyên nghiệp để có được một bộ ảnh chuẩn bìa tạp chí.",
    "Bằng việc kết hợp ánh sáng nghệ thuật, phom dáng trang phục tinh tuyển và góc máy điện ảnh, chúng tôi biến mỗi buổi chụp thành một buổi sáng tạo thời trang riêng tư, nơi bạn hoàn toàn tự do tỏa sáng.",
  ],
  quote:
    "“Không rập khuôn, không công thức. Mỗi khuôn hình là một bản phối của ánh sáng satin và cảm xúc chân thật.”",
  mainImage: "/827830945_17991450459061701_4056127659587889330_n.jpg",
  video: "/v1.mp4",
  detailImage: "/766317124_17983487592061701_4439795435283454152_n.jpg",
  pillars: [
    {
      number: "01",
      roman: "I",
      title: "Cá Tính Độc Bản",
      description: "Tôn vinh vẻ đẹp nguyên bản của riêng bạn.",
    },
    {
      number: "02",
      roman: "II",
      title: "Ánh Sáng Tạp Chí",
      description: "Khắc họa chiều sâu điện ảnh chuẩn editorial.",
    },
    {
      number: "03",
      roman: "III",
      title: "Đạo Diễn Cảm Xúc",
      description: "Dẫn dắt tạo dáng mềm mại, tự nhiên.",
    },
  ],
};

export const conceptsData: readonly ConceptItem[] = [
  {
    id: "personal",
    index: "01",
    title: "Personal Editorial",
    tag: "Mood & Identity",
    description:
      "Tập trung vào vẻ đẹp tự nhiên, chiều sâu ánh mắt và cá tính mộc mạc nhưng đầy khí chất của bạn.",
    image: "/765652706_17983487487061701_1719604522210793188_n.jpg",
    hoverImage: "/766075495_17983487520061701_1222515516559665240_n.jpg",
    hoverCaption: "Rim Light Portrait — Vol. 01",
  },
  {
    id: "fine-art",
    index: "02",
    title: "Fine Art Poetic",
    tag: "Painterly Light",
    description:
      "Giao thoa giữa hội họa cổ điển và nhiếp ảnh hiện đại với ánh sáng chiaroscuro quyến rũ.",
    image: "/833333732_17992080567061701_5562652851810593575_n.jpg",
    hoverImage: "/834437253_17992080585061701_6273648823207875335_n.jpg",
    hoverCaption: "Lace Reverie Detail — Vol. 02",
  },
  {
    id: "costume",
    index: "03",
    title: "Costume & Haute Couture",
    tag: "Runway & Heritage",
    description:
      "Thiết kế trang phục ấn tượng, phom dáng kịch tính cùng layout makeup thời trang cao cấp.",
    image: "/838628556_17992080708061701_4705302932820354249_n.jpg",
    hoverImage: "/832661275_17992080777061701_2414791901023725348_n.jpg",
    hoverCaption: "Baroque Damask Scene — Vol. 03",
  },
  {
    id: "portrait",
    index: "04",
    title: "Classic Studio Portrait",
    tag: "Timeless Frame",
    description:
      "Chân dung đen trắng hoặc tone ấm tối giản, tôn lên từng đường nét tinh xảo và thần thái thanh lịch.",
    image: "/775245328_17985404463061701_5295672598680562023_n.jpg",
    hoverImage: "/776165610_17985404475061701_8767142822172335926_n.jpg",
    hoverCaption: "Buttercup Gown Framing — Vol. 04",
  },
  {
    id: "custom",
    index: "05",
    title: "Custom Curated Story",
    tag: "Bespoke Vision",
    description:
      "Kịch bản chụp độc quyền do bạn và ekip Lychee Layers cùng lên ý tưởng, dựng bối cảnh riêng.",
    image: "/838999814_17992080639061701_7887965066123170312_n.jpg",
    hoverImage: "/827830945_17991450459061701_4056127659587889330_n.jpg",
    hoverCaption: "Urban Narrative Chic — Vol. 05",
  },
];

export const selectedWorksData: readonly GalleryItem[] = [
  {
    id: "work-1",
    title: "Silk & Shadow",
    category: "Fine Art",
    year: "2024",
    image: "/825269734_17990864244061701_824746974579286662_n.jpg",
    aspect: "aspect-[3/4]",
  },
  {
    id: "work-2",
    title: "Whispering Blossom",
    category: "Personal Concept",
    year: "2024",
    image: "/767244076_17983487529061701_4187325223144733272_n.jpg",
    aspect: "aspect-[4/5]",
  },
  {
    id: "work-3",
    title: "L'Etoile Noire",
    category: "Haute Couture",
    year: "2024",
    image: "/774668663_17985404445061701_6311156792851912271_n.jpg",
    aspect: "aspect-[3/4]",
  },
  {
    id: "work-4",
    title: "The Satin Hour",
    category: "Editorial Portrait",
    year: "2024",
    image: "/831424046_17991450465061701_2001209562628488211_n.jpg",
    aspect: "aspect-[4/5]",
  },
  {
    id: "work-5",
    title: "Sculpted Reverie",
    category: "Fine Art",
    year: "2024",
    image: "/832661275_17992080777061701_2414791901023725348_n.jpg",
    aspect: "aspect-[3/4]",
  },
  {
    id: "work-6",
    title: "Velvet Bloom",
    category: "Costume Concept",
    year: "2024",
    image: "/834437253_17992080585061701_6273648823207875335_n.jpg",
    aspect: "aspect-[4/5]",
  },
];

export const experienceSteps: readonly ExperienceStep[] = [
  {
    number: "01",
    title: "Moodboard & Tư Vấn",
    description: "Trao đổi 1:1 cùng Art Director để xác định concept, tone màu và phong cách phù hợp nhất.",
  },
  {
    number: "02",
    title: "Fitting & Makeup",
    description: "Thử trang phục cao cấp tại studio và chăm sóc layout trang điểm chuyên biệt cho ánh sáng chụp.",
  },
  {
    number: "03",
    title: "Buổi Chụp Thơ Mộng",
    description: "Ekip tận tâm hướng dẫn từng ánh mắt, dáng tay và bắt trọn những khoảnh khắc thăng hoa.",
  },
  {
    number: "04",
    title: "Hậu Kỳ Tạp Chí",
    description: "Chỉnh màu da tự nhiên, giữ trọn texture da thật và bàn giao sản phẩm in ấn cao cấp.",
  },
];

export const packagesData: readonly PackageItem[] = [
  {
    id: "pkg-essence",
    name: "Editorial Essence",
    subtitle: "Personal & Portrait Concept",
    priceNotice: "Liên hệ tư vấn báo giá chi tiết",
    badge: "Phổ Biến Nhất",
    isPopular: true,
    features: [
      "01 Concept cá nhân / chân dung nghệ thuật",
      "01 Layout Make-up & Hair chuyên nghiệp chuẩn studio",
      "10 Ảnh chỉnh sửa chi tiết (High-end Retouching)",
      "Bàn giao toàn bộ file ảnh gốc chất lượng cao",
      "Ekip hướng dẫn tạo dáng nhiệt tình suốt buổi chụp",
    ],
  },
  {
    id: "pkg-poesie",
    name: "Haute Poésie",
    subtitle: "Fine Art & Costume Concept",
    priceNotice: "Liên hệ tư vấn báo giá chi tiết",
    badge: "Signature Studio",
    isPopular: false,
    features: [
      "02 Concept nghệ thuật Fine Art / Trang phục thiết kế",
      "02 Layout Make-up & Làm tóc biến hóa theo concept",
      "Miễn phí sử dụng trang phục & phụ kiện độc quyền studio",
      "20 Ảnh retouch cao cấp + 01 Ảnh phóng ép gỗ nghệ thuật",
      "Bàn giao toàn bộ file gốc sau buổi chụp",
    ],
  },
  {
    id: "pkg-bespoke",
    name: "Bespoke Editorial",
    subtitle: "Custom Curated Story",
    priceNotice: "Thiết kế riêng theo yêu cầu",
    badge: "Trọn Gói Cao Cấp",
    isPopular: false,
    features: [
      "Sáng tạo không giới hạn theo kịch bản và câu chuyện riêng",
      "Giám đốc nghệ thuật & Stylist riêng đồng hành toàn diện",
      "Thiết kế bối cảnh, hoa tươi & set ánh sáng độc bản",
      "Bộ ảnh tạp chí hoàn chỉnh (Photobook bìa vải linen cao cấp)",
      "Không gian riêng tư và dịch vụ tea-break chuẩn boutique",
    ],
  },
];

export const lookbookMoods: readonly MoodTab[] = [
  { id: 'all', label: 'Tất Cả Tác Phẩm' },
  { id: 'romance', label: 'Nàng Thơ Lãng Mạn' },
  { id: 'muse', label: 'Nàng Thơ Hiện Đại' },
  { id: 'vintage', label: 'Cổ Điển Pháp & Coquette' },
  { id: 'cocktail', label: 'Quyến Rũ & Sắc Sảo' },
  { id: 'urban', label: 'Cặp Đôi & Phố Thị' },
];

export const lookbookItems: readonly LookbookItem[] = [
  // 1. Nàng Thơ Lãng Mạn (Romance)
  {
    id: 'lb-1',
    title: 'Buttercup Reverie',
    mood: 'romance',
    moodLabel: 'Nàng Thơ Lãng Mạn',
    image: '/776165610_17985404475061701_8767142822172335926_n.jpg',
    aspect: 'aspect-[3/4]',
    caption: 'Đầm lụa vàng bơ, giường sắt cổ điển & chùm hoa bóng bay',
    details: 'Set ánh sáng ấm áp mô phỏng ánh nắng chiều xuyên qua rèm voan, tôn lên nét mơ màng và trong trẻo của nàng thơ.',
    tags: ['Soft Pastel', 'Silk Gown', 'Romantic Light'],
  },
  {
    id: 'lb-2',
    title: 'Whispers on Linen',
    mood: 'romance',
    moodLabel: 'Nàng Thơ Lãng Mạn',
    image: '/774668663_17985404445061701_6311156792851912271_n.jpg',
    aspect: 'aspect-[4/5]',
    caption: 'Góc máy từ trên cao bắt trọn nụ cười thuần khiết',
    details: 'Bố cục cân đối giữa nệm trắng tinh khôi và chùm hoa bóng bay pastel, mang lại cảm giác nhẹ nhàng như một giấc mơ.',
    tags: ['Floral Balloon', 'High Angle', 'Ethereal'],
  },
  {
    id: 'lb-3',
    title: 'Morning Bloom',
    mood: 'romance',
    moodLabel: 'Nàng Thơ Lãng Mạn',
    image: '/775245328_17985404463061701_5295672598680562023_n.jpg',
    aspect: 'aspect-[3/4]',
    caption: 'Cận cảnh chân dung với ánh mắt trong veo',
    details: 'Lớp makeup mỏng nhẹ tự nhiên nhấn vào đôi mắt long lanh và nụ cười rạng rỡ, ghi lại khoảnh khắc thanh xuân đáng nhớ.',
    tags: ['Close-up Portrait', 'Natural Glow', 'Youthful'],
  },
  {
    id: 'lb-4',
    title: 'Sunlit Serenade',
    mood: 'romance',
    moodLabel: 'Nàng Thơ Lãng Mạn',
    image: '/778426496_17985404454061701_7225558674345568160_n.jpg',
    aspect: 'aspect-[4/5]',
    caption: 'Ánh sáng cửa sổ len lỏi qua từng nếp váy lụa',
    details: 'Được chụp với ánh sáng tự nhiên mềm mại kết hợp đèn fill nhẹ, tạo chiều sâu dịu dàng cho khung hình.',
    tags: ['Window Light', 'Sensual Glow', 'Poetic'],
  },

  // 2. Nàng Thơ Hiện Đại (Muse)
  {
    id: 'lb-5',
    title: 'Minimalist Muse',
    mood: 'muse',
    moodLabel: 'Nàng Thơ Hiện Đại',
    image: '/765652706_17983487487061701_1719604522210793188_n.jpg',
    aspect: 'aspect-[3/4]',
    caption: 'Set đồ linen màu be tự nhiên bên chiếc ghế gỗ mộc',
    details: 'Tôn vinh phom dáng hiện đại và thần thái thanh lịch, không cần phông nền cầu kỳ mà vẫn toát lên chất thời trang.',
    tags: ['Beige Linen', 'Tailored', 'Parisian Chic'],
  },
  {
    id: 'lb-6',
    title: 'Golden Hour Silhouette',
    mood: 'muse',
    moodLabel: 'Nàng Thơ Hiện Đại',
    image: '/766075495_17983487520061701_1222515516559665240_n.jpg',
    aspect: 'aspect-[4/5]',
    caption: 'Chân dung cận cảnh đón ánh nắng tự nhiên',
    details: 'Đường nét gương mặt thanh tú được chiếu sáng viền (rim light), tôn lên từng lọn tóc và làn da mịn màng.',
    tags: ['Rim Light', 'Portrait Art', 'Warm Tone'],
  },
  {
    id: 'lb-7',
    title: 'Quiet Confidence',
    mood: 'muse',
    moodLabel: 'Nàng Thơ Hiện Đại',
    image: '/766317124_17983487592061701_4439795435283454152_n.jpg',
    aspect: 'aspect-[3/4]',
    caption: 'Dáng đứng thanh tao trong không gian studio ngập nắng',
    details: 'Góc chụp toàn thân tôn trọn vóc dáng và thần thái tự tin, sang trọng nhưng vẫn rất gần gũi.',
    tags: ['Full Body', 'Clean Space', 'Elegance'],
  },
  {
    id: 'lb-8',
    title: 'The Linen Hour',
    mood: 'muse',
    moodLabel: 'Nàng Thơ Hiện Đại',
    image: '/767244076_17983487529061701_4187325223144733272_n.jpg',
    aspect: 'aspect-[4/5]',
    caption: 'Khoảnh khắc ngồi trầm tĩnh đầy lôi cuốn',
    details: 'Tương tác nhẹ nhàng với chiếc ghế gỗ cổ điển, tạo nên đường nét thị giác mềm mại và tự nhiên.',
    tags: ['Vintage Chair', 'Muted Tone', 'Sophisticated'],
  },

  // 3. Cổ Điển Pháp & Coquette (Vintage)
  {
    id: 'lb-9',
    title: 'Coquette Polka Dream',
    mood: 'vintage',
    moodLabel: 'Cổ Điển Pháp & Coquette',
    image: '/838628556_17992080708061701_4705302932820354249_n.jpg',
    aspect: 'aspect-[3/4]',
    caption: 'Váy chấm bi tay phồng & kẹp tóc ngôi sao ngọt ngào',
    details: 'Bối cảnh ghế bành chạm trổ hoàng gia phong cách Baroque kết hợp layout tóc xoăn sóng bồng bềnh.',
    tags: ['Polka Dots', 'Baroque Chair', 'French Coquette'],
  },
  {
    id: 'lb-10',
    title: 'Parisian Corset & Beret',
    mood: 'vintage',
    moodLabel: 'Cổ Điển Pháp & Coquette',
    image: '/833333732_17992080567061701_5562652851810593575_n.jpg',
    aspect: 'aspect-[4/5]',
    caption: 'Váy corset caro kết hợp mũ beret nâu ấm áp',
    details: 'Nằm thư thái trên sofa họa tiết cổ điển, toát lên chất thơ của một cô gái Pháp trong mùa thu.',
    tags: ['Corset Dress', 'Brown Beret', 'Retro Autumn'],
  },
  {
    id: 'lb-11',
    title: 'Vintage Salon Story',
    mood: 'vintage',
    moodLabel: 'Cổ Điển Pháp & Coquette',
    image: '/832661275_17992080777061701_2414791901023725348_n.jpg',
    aspect: 'aspect-[3/4]',
    caption: 'Không gian phòng khách cổ điển với tường gấm hoa văn',
    details: 'Góc máy rộng khai thác trọn vẹn sự tương phản giữa vẻ đẹp tươi trẻ của nàng thơ và nét hoài cổ của bối cảnh.',
    tags: ['Damask Wall', 'Warm Sunlight', 'Vintage Vibe'],
  },
  {
    id: 'lb-12',
    title: 'Tender Nostalgia',
    mood: 'vintage',
    moodLabel: 'Cổ Điển Pháp & Coquette',
    image: '/834437253_17992080585061701_6273648823207875335_n.jpg',
    aspect: 'aspect-[4/5]',
    caption: 'Ánh nhìn mơ màng gợi nhớ những trang tiểu thuyết Pháp',
    details: 'Ánh sáng tập trung vào bờ vai và chi tiết ren tinh xảo của trang phục, tạo chất điện ảnh sâu lắng.',
    tags: ['Lace Details', 'Cinematic Look', 'Romantic'],
  },

  // 4. Quyến Rũ & Sắc Sảo (Cocktail)
  {
    id: 'lb-13',
    title: 'Little Black Sculpture',
    mood: 'cocktail',
    moodLabel: 'Quyến Rũ & Sắc Sảo',
    image: '/800979481_17990119317061701_7888932770581900000_n.jpg',
    aspect: 'aspect-[3/4]',
    caption: 'Đầm cúp ngực đen đính nút kép trên nền phào chỉ trắng',
    details: 'Phom dáng sắc sảo, đường cắt dứt khoát kết hợp giày cao gót mũi nhọn, toát lên sự quyến rũ độc lập.',
    tags: ['Black Dress', 'High Fashion', 'Sculptural'],
  },
  {
    id: 'lb-14',
    title: 'Haute Noir Silhouette',
    mood: 'cocktail',
    moodLabel: 'Quyến Rũ & Sắc Sảo',
    image: '/796416278_17990119347061701_3734774673612131143_n.jpg',
    aspect: 'aspect-[4/5]',
    caption: 'Tư thế tạo dáng chuẩn người mẫu tạp chí quốc tế',
    details: 'Ánh sáng studio làm nổi bật đường nét xương quai xanh và tỉ lệ cơ thể hoàn hảo.',
    tags: ['Editorial Pose', 'Monochrome Contrast', 'Dramatic'],
  },
  {
    id: 'lb-15',
    title: 'Midnight Gaze',
    mood: 'cocktail',
    moodLabel: 'Quyến Rũ & Sắc Sảo',
    image: '/800066236_17990119371061701_1997058071740847022_n.jpg',
    aspect: 'aspect-[3/4]',
    caption: 'Ánh mắt sắc sảo đầy thần thái quyến rũ',
    details: 'Góc chụp bán thân tập trung vào layout makeup sắc nét và thần thái kiêu kỳ của nhân vật chính.',
    tags: ['Intense Gaze', 'Bold Makeup', 'Seductive'],
  },
  {
    id: 'lb-16',
    title: 'Midnight Elegance',
    mood: 'cocktail',
    moodLabel: 'Quyến Rũ & Sắc Sảo',
    image: '/811028701_17990119332061701_92265643698647578_n.jpg',
    aspect: 'aspect-[4/5]',
    caption: 'Đường nét chuyển động mềm mại nhưng dứt khoát',
    details: 'Bắt trọn khoảnh khắc chuyển động của cơ thể và ánh sáng phản chiếu trên chất liệu satin đen tuyền.',
    tags: ['Fluid Movement', 'Black Satin', 'Chic'],
  },

  // 5. Cặp Đôi & Phố Thị (Urban)
  {
    id: 'lb-17',
    title: 'Urban Laid-back Chic',
    mood: 'urban',
    moodLabel: 'Cặp Đôi & Phố Thị',
    image: '/827830945_17991450459061701_4056127659587889330_n.jpg',
    aspect: 'aspect-[3/4]',
    caption: 'Áo trễ vai tone nâu xám kết hợp quần jeans ống rộng',
    details: 'Phong cách thời trang đường phố đương đại kết hợp bình phong vải thô tối giản, đậm chất Lookbook Look.',
    tags: ['Street Style', 'Denim & Knit', 'Casual Chic'],
  },
  {
    id: 'lb-18',
    title: 'Duo Harmony on Stripes',
    mood: 'urban',
    moodLabel: 'Cặp Đôi & Phố Thị',
    image: '/825269972_17990864232061701_2924908792487049322_n.jpg',
    aspect: 'aspect-[4/5]',
    caption: 'Concept đôi ăn ý trên chiếc sofa kẻ sọc ấm áp',
    details: 'Trang phục thể thao pastel đồng điệu tạo nên câu chuyện tình trẻ trung, phóng khoáng và giàu năng lượng.',
    tags: ['Couple Shoot', 'Pastel Vibe', 'Young Love'],
  },
  {
    id: 'lb-19',
    title: 'Contemporary Duo Romance',
    mood: 'urban',
    moodLabel: 'Cặp Đôi & Phố Thị',
    image: '/825269606_17990864253061701_5223375071030405028_n.jpg',
    aspect: 'aspect-[3/4]',
    caption: 'Khoảnh khắc tương tác tự nhiên không gượng gạo',
    details: 'Ekip bắt trọn những cử chỉ thân mật và ánh nhìn giao nhau ngọt ngào giữa hai người.',
    tags: ['Intimate Duo', 'Candid Moments', 'Modern Story'],
  },
  {
    id: 'lb-20',
    title: 'The Modern Narrative',
    mood: 'urban',
    moodLabel: 'Cặp Đôi & Phố Thị',
    image: '/831424046_17991450465061701_2001209562628488211_n.jpg',
    aspect: 'aspect-[4/5]',
    caption: 'Chân dung cá tính với chiều sâu ánh sáng nghệ thuật',
    details: 'Set ánh sáng contrast vừa phải giúp thể hiện rõ đường nét và thần thái hiện đại.',
    tags: ['Editorial Tone', 'Urban Spirit', 'Authentic'],
  },
];

export const editorialCollections: readonly EditorialCollection[] = [
  {
    id: 'col-romance',
    index: '01',
    volTag: 'VOL. 01 — ROMANTIC DREAMSCAPE',
    title: 'Buttercup Reverie',
    titleItalic: '& The Sunlit Dream',
    mood: 'Nàng Thơ Lãng Mạn',
    description:
      'Giấc mơ thanh xuân trong sắc đầm lụa vàng bơ, chùm hoa bóng bay nghệ thuật và ánh nắng chiều len lỏi qua rèm voan.',
    artDirectionNote:
      'Set ánh sáng mô phỏng nắng tự nhiên 3200K kết hợp rèm voan khuếch tán, tạo vầng hào quang dịu dàng quanh làn da và mái tóc.',
    palette: ['#F7F3E8', '#E8D8C8', '#FAF7F2', '#C9968B'],
    photos: [
      {
        id: 'p-romance-1',
        image: '/776165610_17985404475061701_8767142822172335926_n.jpg',
        title: 'The Buttercup Gown',
        caption: 'Đầm lụa vàng bơ trên giường sắt cổ điển & chùm hoa nghệ thuật',
        aspect: 'aspect-[3/4]',
        role: 'lead',
        tag: 'Hero Spread',
      },
      {
        id: 'p-romance-2',
        image: '/774668663_17985404445061701_6311156792851912271_n.jpg',
        title: 'Floral Whispers',
        caption: 'Góc nhìn từ trên cao bắt trọn nụ cười thuần khiết',
        aspect: 'aspect-[4/5]',
        role: 'detail',
        tag: 'Top Angle',
      },
      {
        id: 'p-romance-3',
        image: '/775245328_17985404463061701_5295672598680562023_n.jpg',
        title: 'Angelic Gaze',
        caption: 'Chân dung cận cảnh đón ánh mắt trong veo rạng ngời',
        aspect: 'aspect-[3/4]',
        role: 'portrait',
        tag: 'Close-up',
      },
      {
        id: 'p-romance-4',
        image: '/778426496_17985404454061701_7225558674345568160_n.jpg',
        title: 'Sunlit Curtain',
        caption: 'Vạt váy lụa rủ mềm mại theo ánh sáng cửa sổ',
        aspect: 'aspect-[4/5]',
        role: 'candid',
        tag: 'Texture',
      },
    ],
  },
  {
    id: 'col-muse',
    index: '02',
    volTag: 'VOL. 02 — THE PARISIAN SUITE',
    title: 'Minimalist Muse',
    titleItalic: '& The Linen Chic',
    mood: 'Nàng Thơ Hiện Đại',
    description:
      'Tôn vinh vẻ đẹp mộc mạc nguyên bản trong bộ suit linen màu be tự nhiên bên chiếc ghế gỗ chạm trổ cổ điển.',
    artDirectionNote:
      'Ánh sáng softbox lớn góc 45 độ kết hợp reflector bạc, giữ trọn texture vải thô mộc và đường nét thanh tú của xương quai xanh.',
    palette: ['#EAE4DC', '#D5C8B8', '#2A2523', '#C5A880'],
    photos: [
      {
        id: 'p-muse-1',
        image: '/765652706_17983487487061701_1719604522210793188_n.jpg',
        title: 'The Linen Jumpsuit',
        caption: 'Set đồ linen màu be tự nhiên bên chiếc ghế gỗ mộc',
        aspect: 'aspect-[3/4]',
        role: 'lead',
        tag: 'Hero Spread',
      },
      {
        id: 'p-muse-2',
        image: '/766075495_17983487520061701_1222515516559665240_n.jpg',
        title: 'Rim Light Portrait',
        caption: 'Ánh sáng viền chiếu rọi làn da và lọn tóc óng ả',
        aspect: 'aspect-[4/5]',
        role: 'portrait',
        tag: 'Rim Light',
      },
      {
        id: 'p-muse-3',
        image: '/766317124_17983487592061701_4439795435283454152_n.jpg',
        title: 'Quiet Stature',
        caption: 'Dáng đứng thanh tao trong không gian studio ngập nắng',
        aspect: 'aspect-[3/4]',
        role: 'detail',
        tag: 'Full Frame',
      },
      {
        id: 'p-muse-4',
        image: '/767244076_17983487529061701_4187325223144733272_n.jpg',
        title: 'The Vintage Armchair',
        caption: 'Khoảnh khắc ngồi trầm tĩnh lôi cuốn từng ánh nhìn',
        aspect: 'aspect-[4/5]',
        role: 'candid',
        tag: 'Atmosphere',
      },
    ],
  },
  {
    id: 'col-vintage',
    index: '03',
    volTag: 'VOL. 03 — BAROQUE COQUETTE',
    title: 'French Coquette',
    titleItalic: '& Retro Autumn',
    mood: 'Cổ Điển Pháp & Coquette',
    description:
      'Họa tiết chấm bi tay phồng, corset caro nâu kết hợp mũ beret trong không gian phòng khách quý tộc cổ điển.',
    artDirectionNote:
      'Tone màu phim ấm áp hoài niệm của gỗ sồi và vải gấm damask, tái hiện chất thơ tiểu thư Pháp thập niên 70.',
    palette: ['#8C583B', '#E5D4C0', '#FAF7F2', '#9E5D52'],
    photos: [
      {
        id: 'p-vintage-1',
        image: '/838628556_17992080708061701_4705302932820354249_n.jpg',
        title: 'Polka Coquette',
        caption: 'Đầm chấm bi tay bồng trên ghế bành Baroque hoàng gia',
        aspect: 'aspect-[3/4]',
        role: 'lead',
        tag: 'Hero Spread',
      },
      {
        id: 'p-vintage-2',
        image: '/833333732_17992080567061701_5562652851810593575_n.jpg',
        title: 'Corset & Beret',
        caption: 'Váy corset caro kết hợp mũ beret trên sofa họa tiết cổ',
        aspect: 'aspect-[4/5]',
        role: 'detail',
        tag: 'French Vibe',
      },
      {
        id: 'p-vintage-3',
        image: '/832661275_17992080777061701_2414791901023725348_n.jpg',
        title: 'Damask Chamber',
        caption: 'Không gian phòng khách cổ điển với tường gấm hoa văn',
        aspect: 'aspect-[3/4]',
        role: 'portrait',
        tag: 'Wide Scene',
      },
      {
        id: 'p-vintage-4',
        image: '/834437253_17992080585061701_6273648823207875335_n.jpg',
        title: 'Lace Reverie',
        caption: 'Ánh nhìn mơ màng với bờ vai ren tinh xảo',
        aspect: 'aspect-[4/5]',
        role: 'candid',
        tag: 'Poetic Detail',
      },
    ],
  },
  {
    id: 'col-noir',
    index: '04',
    volTag: 'VOL. 04 — HAUTE STRUCTURE',
    title: 'Little Black Sculpture',
    titleItalic: '& Haute Noir',
    mood: 'Quyến Rũ & Sắc Sảo',
    description:
      'Đầm cúp ngực đen đính nút kép sắc sảo, đường cắt dứt khoát tôn lên vẻ đẹp kiêu kỳ và quyền lực.',
    artDirectionNote:
      'Kỹ thuật set up ánh sáng Chiaroscuro tương phản cao, tạo viền sáng dứt khoát trên phông nền phào chỉ trắng tinh tế.',
    palette: ['#1A1716', '#FAF7F2', '#C9968B', '#4A423E'],
    photos: [
      {
        id: 'p-noir-1',
        image: '/800979481_17990119317061701_7888932770581900000_n.jpg',
        title: 'The Black Sculpture',
        caption: 'Đầm cúp ngực đen đính nút kép trên nền phào chỉ trắng',
        aspect: 'aspect-[3/4]',
        role: 'lead',
        tag: 'Hero Spread',
      },
      {
        id: 'p-noir-2',
        image: '/796416278_17990119347061701_3734774673612131143_n.jpg',
        title: 'High Fashion Silhouette',
        caption: 'Tư thế tạo dáng chuẩn người mẫu trang bìa tạp chí',
        aspect: 'aspect-[4/5]',
        role: 'detail',
        tag: 'Dramatic Pose',
      },
      {
        id: 'p-noir-3',
        image: '/800066236_17990119371061701_1997058071740847022_n.jpg',
        title: 'Midnight Gaze',
        caption: 'Ánh mắt sắc sảo đầy thần thái kiêu kỳ của nhân vật chính',
        aspect: 'aspect-[3/4]',
        role: 'portrait',
        tag: 'Intense Eye',
      },
      {
        id: 'p-noir-4',
        image: '/811028701_17990119332061701_92265643698647578_n.jpg',
        title: 'Satin Fluidity',
        caption: 'Đường nét chuyển động mềm mại trên chất liệu satin đen',
        aspect: 'aspect-[4/5]',
        role: 'candid',
        tag: 'Motion',
      },
    ],
  },
  {
    id: 'col-urban',
    index: '05',
    volTag: 'VOL. 05 — URBAN MODERNITY',
    title: 'Contemporary Duo',
    titleItalic: '& City Harmony',
    mood: 'Cặp Đôi Phố Thị',
    description:
      'Sự hòa quyện giữa thời trang đương đại, nét phóng khoáng đường phố và cảm xúc kết nối tự nhiên.',
    artDirectionNote:
      'Bắt trọn ánh mắt giao nhau và cử chỉ thân mật trong không gian sofa kẻ sọc trẻ trung, giàu năng lượng.',
    palette: ['#C4B5A5', '#F2EBE1', '#5C534E', '#C9968B'],
    photos: [
      {
        id: 'p-urban-1',
        image: '/827830945_17991450459061701_4056127659587889330_n.jpg',
        title: 'Laid-back Chic',
        caption: 'Áo trễ vai tone nâu xám kết hợp quần jeans ống rộng',
        aspect: 'aspect-[3/4]',
        role: 'lead',
        tag: 'Hero Spread',
      },
      {
        id: 'p-urban-2',
        image: '/825269972_17990864232061701_2924908792487049322_n.jpg',
        title: 'Duo on Stripes',
        caption: 'Concept đôi ăn ý trên chiếc sofa kẻ sọc ấm áp',
        aspect: 'aspect-[4/5]',
        role: 'detail',
        tag: 'Duo Vibe',
      },
      {
        id: 'p-urban-3',
        image: '/825269606_17990864253061701_5223375071030405028_n.jpg',
        title: 'Candid Gaze',
        caption: 'Khoảnh khắc tương tác tự nhiên đầy ngọt ngào',
        aspect: 'aspect-[3/4]',
        role: 'portrait',
        tag: 'Intimate',
      },
      {
        id: 'p-urban-4',
        image: '/831424046_17991450465061701_2001209562628488211_n.jpg',
        title: 'The Contemporary Frame',
        caption: 'Chân dung cá tính với chiều sâu ánh sáng nghệ thuật',
        aspect: 'aspect-[4/5]',
        role: 'candid',
        tag: 'Street Tone',
      },
    ],
  },
];
