export interface TeamMember {
    name: string;
    role: string;
    roleTH: string;
    bio?: string;
    bioTH?: string;
    image?: string;
}

export interface AdvisoryMember {
    name: string;
    title?: string;
    titleTH?: string;
}

export const FOUNDER: TeamMember = {
    name: 'Marisa Chearavanont',
    role: 'Founder',
    roleTH: 'ผู้ก่อตั้ง',
    bio: 'Born in South Korea and later naturalized Thai, Ms. Marisa Chearavanont is a philanthropist, art collector and patron. With her primary focus in art, education and gastronomy, the three elements that are helping connect Thai culture to the world, Ms. Chearavanont founded Thai Art Initiative (ThAI) in 2022 and Bangkok Kunsthalle in 2024 with the mission of making Thailand the Southeast Asian hub for contemporary art.\n\nMs. Chearavanont is noted for her contributions to the contemporary art scene. She serves as Asia-Pacific Acquisition Committee for Tate Modern (London) and International Leadership Council for New Museum (New York City). In 2022, Ms. Chearavanont was the first recipient of RINASCIMENTO+ Award for her role as an art collector. In Asia, she is a Founding Patron for M+ Museum (Hong Kong) and member of BACC Foundation committee (Bangkok) as well as being appointed senior expert by Thailand\'s Ministry of Culture and Office of The Prime Minister to advise and oversee the development of contemporary art, culture and national identity in Thailand.',
    bioTH: 'คุณมาริสา เจียระวนนท์ เกิดในเกาหลีใต้และต่อมาได้รับสัญชาติไทย เป็นนักการกุศล นักสะสมงานศิลปะ และผู้อุปถัมภ์ โดยมุ่งเน้นหลักในด้านศิลปะ การศึกษา และการทำอาหาร ซึ่งเป็นสามองค์ประกอบที่ช่วยเชื่อมโยงวัฒนธรรมไทยกับโลก คุณเจียระวนนท์ก่อตั้ง Thai Art Initiative (ThAI) ในปี 2565 และ Bangkok Kunsthalle ในปี 2567 ด้วยพันธกิจในการทำให้ประเทศไทยเป็นศูนย์กลางศิลปะร่วมสมัยของเอเชียตะวันออกเฉียงใต้\n\nคุณเจียระวนนท์เป็นที่รู้จักจากการมีส่วนร่วมในวงการศิลปะร่วมสมัย ดำรงตำแหน่งคณะกรรมการจัดหาผลงานเอเชีย-แปซิฟิกสำหรับ Tate Modern (ลอนดอน) และสภาผู้นำระดับนานาชาติสำหรับ New Museum (นิวยอร์ก) ในปี 2565 คุณเจียระวนนท์เป็นผู้รับรางวัล RINASCIMENTO+ คนแรกจากบทบาทในฐานะนักสะสมงานศิลปะ ในเอเชีย เธอเป็นผู้อุปถัมภ์ผู้ก่อตั้งพิพิธภัณฑ์ M+ (ฮ่องกง) และสมาชิกคณะกรรมการมูลนิธิ BACC (กรุงเทพฯ) รวมถึงได้รับการแต่งตั้งเป็นผู้เชี่ยวชาญอาวุโสโดยกระทรวงวัฒนธรรมและสำนักนายกรัฐมนตรีของประเทศไทย เพื่อให้คำปรึกษาและดูแลการพัฒนาศิลปะร่วมสมัย วัฒนธรรม และอัตลักษณ์ของชาติในประเทศไทย',
    image: 'https://lirp.cdn-website.com/5516674f/dms3rep/multi/opt/Puma_Khao+Yai+Art+Forest+Images+for+Website-7.+Team--Marisa+Portraits-+Chinnakit+Ruenma+3-d0f08b0e-1920w.jpg'
};

export const DIRECTORS: TeamMember[] = [
    {
        name: 'Stefano Rabolli Pansera',
        role: 'Director',
        roleTH: 'ผู้อำนวยการ',
        bio: 'Stefano Rabolli Pansera is an architect and curator. He studied at the Architectural Association in London where he graduated with Honors in 2005. He taught at the Architectural Association as Unit Master from 2007 to 2011.\n\nIn 2013, he founded Beyond Entropy Ltd, a curatorial agency operating at the threshold of art, architecture and geopolitics. He curated the Angolan Pavilion at the 55th Venice Biennale (Golden Lion for Best National Participation).\n\nHe has been the director of Hauser & Wirth in London and St. Moritz. He is currently the Director of Bangkok Kunsthalle.',
        bioTH: 'Stefano Rabolli Pansera เป็นสถาปนิกและภัณฑารักษ์ เขาศึกษาที่ Architectural Association ในลอนดอนและสำเร็จการศึกษาด้วยเกียรตินิยมในปี 2548 เขาสอนที่ Architectural Association ในตำแหน่ง Unit Master ตั้งแต่ปี 2550 ถึง 2554\n\nในปี 2556 เขาก่อตั้ง Beyond Entropy Ltd ซึ่งเป็นหน่วยงานจัดการด้านศิลปะที่ดำเนินการในจุดบรรจบของศิลปะ สถาปัตยกรรม และภูมิรัฐศาสตร์ เขาเป็นภัณฑารักษ์ของศาลาองโกลาในงาน Venice Biennale ครั้งที่ 55 (ได้รับรางวัล Golden Lion สำหรับการมีส่วนร่วมของชาติที่ดีที่สุด)\n\nเขาเคยดำรงตำแหน่งผู้อำนวยการของ Hauser & Wirth ในลอนดอนและเซนต์มอริทซ์ ปัจจุบันเขาเป็นผู้อำนวยการของ Bangkok Kunsthalle',
        image: 'https://lirp.cdn-website.com/5516674f/dms3rep/multi/opt/Puma_Khao+Yai+Art+Forest+Images+for+Website-7.+Team--Stefano+Portraits-+Nut+Fotofixed+1-1920w.jpg'
    },
    {
        name: 'Luckana Kunavichayanont',
        role: 'Director',
        roleTH: 'ผู้อำนวยการ',
        bio: 'Luckana Kunavichayanont is a prominent figure in the Thai art scene, known for her leadership and curatorial work. She served as the Director of the Bangkok Art and Culture Centre (BACC) for many years, steering it to become a central hub for contemporary art in Thailand.',
        bioTH: 'ลักขณา คุณาวิชยานนท์ เป็นบุคคลสำคัญในวงการศิลปะไทย ที่รู้จักจากความเป็นผู้นำและงานภัณฑารักษ์ เธอดำรงตำแหน่งผู้อำนวยการศูนย์ศิลปวัฒนธรรมแห่งกรุงเทพมหานคร (BACC) เป็นเวลาหลายปี นำพามันกลายเป็นศูนย์กลางของศิลปะร่วมสมัยในประเทศไทย'
    },
    {
        name: 'Poonperm Paitayawat',
        role: 'Food & Gastronomy',
        roleTH: 'อาหารและศาสตร์การทำอาหาร',
        bio: 'Poonperm Paitayawat oversees the Food & Gastronomy sector of Bangkok Kunsthalle, bridging the gap between culinary arts and contemporary culture.',
        bioTH: 'พูนเพิ่ม ไพทยวัฒน์ ดูแลภาคส่วนอาหารและศาสตร์การทำอาหารของ Bangkok Kunsthalle เชื่อมโยงช่องว่างระหว่างศิลปะการทำอาหารและวัฒนธรรมร่วมสมัย'
    },
    {
        name: 'Claudia Ko',
        role: 'Financial Sustainability & Donor Relations',
        roleTH: 'ความยั่งยืนทางการเงินและความสัมพันธ์กับผู้บริจาค',
        bio: 'Claudia Ko manages Financial Sustainability & Donor Relations, ensuring the long-term viability and growth of the institution through strategic partnerships and donor engagement.',
        bioTH: 'Claudia Ko จัดการความยั่งยืนทางการเงินและความสัมพันธ์กับผู้บริจาค เพื่อให้มั่นใจในความยั่งยืนและการเติบโตระยะยาวของสถาบันผ่านความร่วมมือเชิงกลยุทธ์และการมีส่วนร่วมของผู้บริจาค'
    }
];

export const ADVISORY_BOARD_MEMBERS: string[] = [
    'Juan Carlos Verme',
    'Disaphol Chansiri',
    'Alan Lau',
    'Woon Kyung Lee',
    'Manuela Lucà-Dazio',
    'Jessica Morgan',
    'Rita and Uli Sigg',
    'Taizo Son'
];

export const DONORS: string[] = [
    'Sangita Jindal',
    'Isabel Liu',
    'Takeo Obayashi',
    'Taizo Son',
    'Nunthinee Tanner',
    'Elisa Yu',
    'Lisa Zhang'
];

export const TEAM_MEMBERS: TeamMember[] = [
    { name: 'Ratsiree Rattanawan', role: 'Assistant Curator', roleTH: 'ผู้ช่วยภัณฑารักษ์' },
    { name: 'Mark Chearavanont', role: 'Installation & Artworks Support', roleTH: 'สนับสนุนการติดตั้งและงานศิลปะ' },
    { name: 'Gemmica Sinthawalai', role: 'Installation & Artworks Support', roleTH: 'สนับสนุนการติดตั้งและงานศิลปะ' },
    { name: 'PLandscape', role: 'Landscape Design and Research', roleTH: 'การออกแบบภูมิทัศน์และการวิจัย' },
    { name: 'Phakjira Pattapong', role: 'Project Management', roleTH: 'การจัดการโครงการ' },
    { name: 'Chaichana Chaiklang', role: 'Site Operation Team', roleTH: 'ทีมปฏิบัติการในสถานที่' },
    { name: 'Maneenuch Matuka', role: 'Site Operation Team', roleTH: 'ทีมปฏิบัติการในสถานที่' },
    { name: 'Ekalak Piroon', role: 'Site Operation Team', roleTH: 'ทีมปฏิบัติการในสถานที่' },
    { name: 'Nantawat Piloon', role: 'Site Operation Team', roleTH: 'ทีมปฏิบัติการในสถานที่' },
    { name: 'Sutchada Sangchat', role: 'Site Operation Team', roleTH: 'ทีมปฏิบัติการในสถานที่' },
    { name: 'Thongphian Chanta', role: 'Landscape and Art Maintenance Team', roleTH: 'ทีมบำรุงรักษาภูมิทัศน์และศิลปะ' },
    { name: 'Sitthiphorn Khanthanoo', role: 'Landscape and Art Maintenance Team', roleTH: 'ทีมบำรุงรักษาภูมิทัศน์และศิลปะ' },
    { name: 'Ratasapa Panalai', role: 'Landscape and Art Maintenance Team', roleTH: 'ทีมบำรุงรักษาภูมิทัศน์และศิลปะ' },
    { name: 'Phenmanee Tumkam', role: 'Landscape and Art Maintenance Team', roleTH: 'ทีมบำรุงรักษาภูมิทัศน์และศิลปะ' },
    { name: 'Chef Wuttisak Wuttiamporn', role: 'Culinary Director', roleTH: 'ผู้อำนวยการด้านการทำอาหาร' },
    { name: 'Thirasak Bunto', role: 'Graphic Designer', roleTH: 'นักออกแบบกราฟิก' },
    { name: 'Supanee Amraranga', role: 'Coordination Team', roleTH: 'ทีมประสานงาน' },
    { name: 'Rudjira Kriengyakul', role: 'Coordination Team', roleTH: 'ทีมประสานงาน' },
    { name: 'Chanisara Nukeaw', role: 'Coordination Team', roleTH: 'ทีมประสานงาน' },
    { name: 'Kwankeat Phiophong', role: 'Coordination Team', roleTH: 'ทีมประสานงาน' },
    { name: 'Vorada Teemee', role: 'Coordination Team', roleTH: 'ทีมประสานงาน' },
    { name: 'Sulawan Wongthong', role: 'Coordination Team', roleTH: 'ทีมประสานงาน' },
    { name: 'Siripat Rojnirun', role: 'Financial Sustainability & Donor Relations', roleTH: 'ความยั่งยืนทางการเงินและความสัมพันธ์กับผู้บริจาค' }
];

// Organized team structure by categories
export interface TeamCategory {
    category: string;
    categoryTH: string;
    members: TeamMember[];
}

export const TEAM_BY_CATEGORY: TeamCategory[] = [
    {
        category: 'Assistant Curator',
        categoryTH: 'ผู้ช่วยภัณฑารักษ์',
        members: [
            { name: 'Ratsiree Rattanawan', role: 'Assistant Curator', roleTH: 'ผู้ช่วยภัณฑารักษ์' }
        ]
    },
    {
        category: 'Installation & Artworks Support',
        categoryTH: 'สนับสนุนการติดตั้งและงานศิลปะ',
        members: [
            { name: 'Mark Chearavanont', role: '', roleTH: '' },
            { name: 'Gemmica Sinthawalai', role: '', roleTH: '' }
        ]
    },
    {
        category: 'Landscape Design and Research',
        categoryTH: 'การออกแบบภูมิทัศน์และการวิจัย',
        members: [
            { name: 'PLandscape', role: '', roleTH: '' }
        ]
    },
    {
        category: 'Project Management',
        categoryTH: 'การจัดการโครงการ',
        members: [
            { name: 'Phakjira Pattapong', role: '', roleTH: '' }
        ]
    },
    {
        category: 'Site Operation Team',
        categoryTH: 'ทีมปฏิบัติการในสถานที่',
        members: [
            { name: 'Chaichana Chaiklang', role: '', roleTH: '' },
            { name: 'Maneenuch Matuka', role: '', roleTH: '' },
            { name: 'Ekalak Piroon', role: '', roleTH: '' },
            { name: 'Nantawat Piloon', role: '', roleTH: '' },
            { name: 'Sutchada Sangchat', role: '', roleTH: '' }
        ]
    },
    {
        category: 'Landscape and Art Maintenance Team',
        categoryTH: 'ทีมบำรุงรักษาภูมิทัศน์และศิลปะ',
        members: [
            { name: 'Thongphian Chanta', role: '', roleTH: '' },
            { name: 'Sitthiphorn Khanthanoo', role: '', roleTH: '' },
            { name: 'Ratasapa Panalai', role: '', roleTH: '' },
            { name: 'Phenmanee Tumkam', role: '', roleTH: '' }
        ]
    },
    {
        category: 'Culinary',
        categoryTH: 'การทำอาหาร',
        members: [
            { name: 'Chef Wuttisak Wuttiamporn', role: 'Culinary Director', roleTH: 'ผู้อำนวยการด้านการทำอาหาร' }
        ]
    },
    {
        category: 'Design',
        categoryTH: 'ออกแบบ',
        members: [
            { name: 'Thirasak Bunto', role: 'Graphic Designer', roleTH: 'นักออกแบบกราฟิก' }
        ]
    },
    {
        category: 'Coordination Team',
        categoryTH: 'ทีมประสานงาน',
        members: [
            { name: 'Supanee Amraranga', role: '', roleTH: '' },
            { name: 'Rudjira Kriengyakul', role: '', roleTH: '' },
            { name: 'Chanisara Nukeaw', role: '', roleTH: '' },
            { name: 'Kwankeat Phiophong', role: '', roleTH: '' },
            { name: 'Vorada Teemee', role: '', roleTH: '' },
            { name: 'Sulawan Wongthong', role: '', roleTH: '' }
        ]
    },
    {
        category: 'Financial Sustainability & Donor Relations',
        categoryTH: 'ความยั่งยืนทางการเงินและความสัมพันธ์กับผู้บริจาค',
        members: [
            { name: 'Siripat Rojnirun', role: '', roleTH: '' }
        ]
    }
];