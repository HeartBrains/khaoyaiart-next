export interface Director {
    name: string;
    role: string;
    roleTH: string;
    bio: string[];
    bioTH: string[];
    image?: string;
}

export interface TeamGroup {
    role: string;
    roleTH: string;
    members: string[];
    membersTH?: string[]; // Assuming names are usually kept in English or transliterated, but for now we'll use same names if not provided
}

export const FOUNDER: Director = {
    name: 'Marisa Chearavanont',
    role: 'Founder',
    roleTH: 'ผู้ก่อตั้ง',
    bio: [
        "Born in South Korea and later naturalised Thai, Ms. Marisa Chearavanont is a philanthropist, art collector and patron. With her primary focus in art, education and gastronomy – the three elements that are helping connect Thai culture to the world – Ms. Chearavanont founded Thai Art Initiative (ThAI) in 2022 and Bangkok Kunsthalle in 2024 with the mission of making Thailand the Southeast Asian hub for contemporary art.",
        "Ms. Chearavanont is noted for her contributions to the contemporary art scene. She serves as Asia-Pacific Acquisition Committee for Tate Modern (London) and International Leadership Council for New Museum (New York City). In 2022, Ms. Chearavanont was the first recipient of RINASCIMENTO+ Award for her role as an art collector. In Asia, she is a Founding Patron for M+ Museum (Hong Kong) and member of BACC Foundation committee (Bangkok) as well as being appointed senior expert by Thailand's Ministry of Culture and Office of The Prime Minister to advise and oversee the development of contemporary art, culture and national identity in Thailand."
    ],
    bioTH: [
        "คุณมาริษา เจียรวนนท์ เกิดที่สาธารณรัฐเกาหลี และต่อมาได้รับสัญชาติไทย เป็นนักสะสมศิลปะและผู้อุปถัมภ์ศิลปะที่มีวิสัยทัศน์ ด้วยความมุ่งมั่นในศิลปะ การศึกษา และอาหาร ซึ่งเป็นสามองค์ประกอบสำคัญที่เชื่อมโยงวัฒนธรรมไทยสู่เวทีโลก คุณมาริษาได้ก่อตั้ง Thai Art Initiative (ThAI) ในปี พ.ศ. 2565 และบางกอก คุนสท์ฮัลเล่ ในปี พ.ศ. 2567 ด้วยพันธกิจในการยกระดับประเทศไทยให้เป็นศูนย์กลางศิลปะร่วมสมัยแห่งเอเชียตะวันออกเฉียงใต้",
        "คุณมาริษามีบทบาทสำคัญในแวดวงศิลปะร่วมสมัยระดับโลก ปัจจุบันดำรงตำแหน่งในคณะกรรมการจัดหาผลงานศิลปะภูมิภาคเอเชีย-แปซิฟิกของ Tate Modern (ลอนดอน) และสภาผู้นำระหว่างประเทศของ New Museum (นิวยอร์ก) ในปี พ.ศ. 2565 คุณมาริษาได้รับรางวัล RINASCIMENTO+ Award เป็นคนแรก เพื่อยกย่องบทบาทในฐานะนักสะสมศิลปะผู้มีวิสัยทัศน์ ในภูมิภาคเอเชีย ดำรงตำแหน่งผู้อุปถัมภ์ผู้ก่อตั้ง M+ Museum (ฮ่องกง) และกรรมการมูลนิธิหอศิลป์ BACC (กรุงเทพฯ) รวมถึงได้รับการแต่งตั้งเป็นผู้เชี่ยวชาญอาวุโสโดยกระทรวงวัฒนธรรมและสำนักนายกรัฐมนตรีแห่งประเทศไทย เพื่อให้คำปรึกษาและกำกับดูแลการพัฒนาศิลปะร่วมสมัย วัฒนธรรม และเอกลักษณ์ของชาติ"
    ],
    image: 'https://irp.cdn-website.com/5516674f/dms3rep/multi/Puma_Images+for+Website-Bangkok+Kunsthalle+Images+for+Website-9.+Team--Marisa+Portraits-+Naat+Krairiksh.jpg'
};

export const DIRECTORS: Director[] = [
    {
        name: 'Stefano Rabolli Pansera',
        role: 'Director',
        roleTH: 'ผู้อำนวยการ',
        bio: [
            "Stefano Rabolli Pansera is an architect and curator. He studied at the Architectural Association in London where he graduated with Honours in 2005. He taught at the Architectural Association as Unit Master from 2007 to 2011.",
            "In 2013, he founded Beyond Entropy Ltd, a curatorial agency operating at the threshold of art, architecture and geopolitics. He curated the Angolan Pavilion at the 55th Venice Biennale (Golden Lion for Best National Participation).",
            "He has been the director of Hauser & Wirth in London and St. Moritz. He is currently the Director of Bangkok Kunsthalle."
        ],
        bioTH: [
            "สเตฟาโน ราบอลลี ปันเซรา เป็นสถาปนิกและภัณฑารักษ์ เขาศึกษาที่ Architectural Association ในลอนดอนและสำเร็จการศึกษาด้วยเกียรตินิยมในปี พ.ศ. 2548 เขาสอนที่ Architectural Association ในตำแหน่ง Unit Master ตั้งแต่ปี พ.ศ. 2550 ถึง 2554",
            "ในปี พ.ศ. 2556 เขาได้ก่อตั้ง Beyond Entropy Ltd องค์กรภัณฑารักษ์ที่ดำเนินงานในจุดตัดของศิลปะ สถาปัตยกรรม และภูมิรัฐศาสตร์ เขาเป็นภัณฑารักษ์ให้กับศาลาแองโกลาในงาน Venice Biennale ครั้งที่ 55 (ได้รับรางวัล Golden Lion สำหรับการมีส่วนร่วมระดับชาติที่ดีที่สุด)",
            "เขาเคยเป็นผู้อำนวยการของ Hauser & Wirth ในลอนดอนและเซนต์มอริตซ์ ปัจจุบันดำรงตำแหน่งผู้อำนวยการของบางกอก คุนสท์ฮัลเล่"
        ],
        image: 'https://irp.cdn-website.com/5516674f/dms3rep/multi/Puma_Images+for+Website-Bangkok+Kunsthalle+Images+for+Website-9.+Team--Stefano+Portraits-+Andrea+Rossetti+3+-+Copy.jpg'
    },
    {
        name: 'Luckana Kunavichayanont',
        role: 'Director',
        roleTH: 'ผู้อำนวยการ',
        bio: [
            "Luckana Kunavichayanont is a prominent figure in the Thai art scene, known for her leadership and curatorial work. She served as the Director of the Bangkok Art and Culture Centre (BACC) for many years, steering it to become a central hub for contemporary art in Thailand."
        ],
        bioTH: [
            "ลักขณา กุลนาวิชญานนท์ เป็นบุคคลสำคัญในแวดวงศิลปะไทย มีชื่อเสียงในด้านความเป็นผู้นำและงานภัณฑารักษ์ เธอดำรงตำแหน่งผู้อำนวยการหอศิลปวัฒนธรรมแห่งกรุงเทพมหานคร (BACC) เป็นเวลาหลายปี นำพาให้กลายเป็นศูนย์กลางสำคัญของศิลปะร่วมสมัยในประเทศไทย"
        ],
        image: 'https://irp.cdn-website.com/5516674f/dms3rep/multi/Puma_Images+for+Website-Bangkok+Kunsthalle+Images+for+Website-9.+Team--Luckana-+Krittawat+Atthsis+3+-+Copy.jpg'
    },
    {
        name: 'Poonperm Paitayawat',
        role: 'Food & Gastronomy',
        roleTH: 'อาหารและแกสโทรโนมี',
        bio: [
            "Poonperm Paitayawat oversees the Food & Gastronomy sector of Bangkok Kunsthalle, bridging the gap between culinary arts and contemporary culture."
        ],
        bioTH: [
            "พูนเพิ่ม ไพทยวัฒน์ ดูแลภาคส่วนอาหารและแกสโทรโนมีของบางกอก คุนสท์ฮัลเล่ เชื่อมโยงช่องว่างระหว่างศิลปะการทำอาหารและวัฒนธรรมร่วมสมัย"
        ]
    },
    {
        name: 'Claudia Ko',
        role: 'Financial Sustainability & Donor Relations',
        roleTH: 'ความยั่งยืนทางการเงินและความสัมพันธ์กับผู้บริจาค',
        bio: [
            "Claudia Ko manages Financial Sustainability & Donor Relations, ensuring the long-term viability and growth of the institution through strategic partnerships and donor engagement."
        ],
        bioTH: [
            "คลอเดีย โก บริหารจัดการความยั่งยืนทางการเงินและความสัมพันธ์กับผู้บริจาค รับประกันความมั่นคงและการเติบโตระยะยาวของสถาบันผ่านความร่วมมือเชิงกลยุทธ์และการมีส่วนร่วมของผู้บริจาค"
        ]
    }
];

export const TEAM_GROUPS: TeamGroup[] = [
    {
        role: 'Advisory Board',
        roleTH: 'คณะที่ปรึกษา',
        members: [
            'Juan Carlos Verme',
            'Disaphol Chansiri',
            'Alan Lau',
            'Woon Kyung Lee',
            'Manuela Lucà-Dazio',
            'Jessica Morgan',
            'Rita and Uli Sigg',
            'Taizo Son'
        ]
    },
    {
        role: "Founder's Circle & Collector's Roundtable Donors",
        roleTH: 'วงผู้ก่อตั้งและผู้บริจาคโต๊ะกลมนักสะสม',
        members: [
            'Sangita Jindal',
            'Isabel Liu',
            'Takeo Obayashi',
            'Taizo Son',
            'Nunthinee Tanner',
            'Elisa Yu',
            'Lisa Zhang'
        ]
    },
    {
        role: 'Curators',
        roleTH: 'ภัณฑารักษ์',
        members: ['Mark Chearavanont', 'Gemmica Sinthawalai'],
        membersTH: ['มาร์ค เจียรวนนท์', 'เขมิกา สินธวาลัย']
    },
    {
        role: 'Moving Image Curator',
        roleTH: 'ภัณฑารักษ์ภาพเคลื่อนไหว',
        members: ['Rosalia Namsai Engchuan'],
        membersTH: ['โรซาเลีย น้ำใส เอ็งชวน']
    },
    {
        role: 'Education and Public Program Co-ordinator',
        roleTH: 'ผู้ประสานงานการศึกษาและโปรแกรมสาธารณะ',
        members: ['Thanchanok Benjajinda'],
        membersTH: ['ธัญชนก เบญจจินดา']
    },
    {
        role: 'Gallery Co-ordinator',
        roleTH: 'ผู้ประสานงานแกลเลอรี',
        members: ['Porrama Laopiyasakul'],
        membersTH: ['พรรมา เหล่าปิยะสกุล']
    },
    {
        role: 'Graphic Designer',
        roleTH: 'กราฟิกดีไซเนอร์',
        members: ['Thirasak Bunto'],
        membersTH: ['ธีรศักดิ์ บัณโฑ']
    },
    {
        role: 'Publication Editor',
        roleTH: 'บรรณาธิการสิ่งพิมพ์',
        members: ['Korn Karava'],
        membersTH: ['กร คาราวา']
    },
    {
        role: 'Operation Team',
        roleTH: 'ทีมปฏิบัติการ',
        members: ['Supanee Amraranga', 'Chanisara Nukeaw', 'Sulawan Wongthong'],
        membersTH: ['สุพนี อำระนางค์', 'ชนิสรา นุเกียว', 'สุลาวัลย์ วงศ์ทอง']
    },
    {
        role: 'Financial Sustainability & Donor Relations',
        roleTH: 'ความยั่งยืนทางการเงินและความสัมพันธ์กับผู้บริจาค',
        members: ['Siripat Rojnirun'],
        membersTH: ['ศิริภัทร โรจน์นิรันดร์']
    },
    {
        role: 'Building Caretaker',
        roleTH: 'ผู้ดูแลอาคาร',
        members: ['Monta Saleerueng'],
        membersTH: ['มณฑา สาลีเรือง']
    }
];