export interface PressItem {
  id: number;
  date: string;
  dateTH: string;
  title: string;
  titleTH: string;
  link: string;
  type: 'pdf' | 'article';
}

export const PRESS_ITEMS: PressItem[] = [
  {
    id: 1,
    date: "November 22, 2025",
    dateTH: "22 พฤศจิกายน 2568",
    title: "Bangkok Kunsthalle Opens New Exhibition",
    titleTH: "บางกอก คุนสท์ฮัลเล่ เปิดนิทรรศการใหม่",
    link: "#",
    type: 'pdf'
  },
  {
    id: 2,
    date: "October 15, 2025",
    dateTH: "15 ตุลาคม 2568",
    title: "Interview with Curator Mark Chearavanont",
    titleTH: "บทสัมภาษณ์ภัณฑารักษ์ มาร์ค เจียรวนนท์",
    link: "#",
    type: 'article'
  }
];
