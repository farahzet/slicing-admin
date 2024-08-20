import DashboardIcon from '../assets/images/DashboardIcon.png'
import DashboardIconWh from '../assets/images/DashboardIconWh.png'
import FoodIcon from '../assets/images/FoodIcon.png'
import FoodIconWh from '../assets/images/FoodIconWh.png'
import KriteriaIcon from '../assets/images/KriteriaIcon.png'
import KriteriaIconWh from '../assets/images/KriteriaIconWh.png'
import PenilaianIcon from '../assets/images/PenilaianIcon.png'
import PenilaianIconWh from '../assets/images/PenilaianIconWh.png'
import UserIcon from '../assets/images/UserIcon.png'
import UserIconWh from '../assets/images/UserIconWh.png'

export const navTitle = [
    {
      route: '',
      title: 'Dashboard',
    },
    {
      route: 'food',
      title: 'Data Makanan',
    },
    {
      route: 'criteria',
      title: 'Data Kriteria',
    },
    {
      route: 'score',
      title: 'Data Penilaian',
    },
    {
      route: 'users',
      title: 'Data User',
    },
  ]

export const sides = [
  {
    icon: DashboardIcon,
    icon2: DashboardIconWh,
    label: 'Dashboard',
    link: '/'
  },
  {
    icon: FoodIcon,
    icon2: FoodIconWh,
    label: 'Data Makanan',
    link: '/food'
  },
  {
    icon: KriteriaIcon,
    icon2: KriteriaIconWh,
    label: 'Data Kriteria',
    link: '/criteria'
  },
  {
    icon: PenilaianIcon,
    icon2: PenilaianIconWh,
    label: 'Data Penilaian',
    link: '/score'
  },
  {
    icon: UserIcon,
    icon2: UserIconWh,
    label: 'Data User',
    link: '/users'
  },
]

export const thead = ["Tanggal Register","Nama Lengkap", "Email" , "Kontak"];
export const theadRiwayat = ["ID", "Tanggal", "Jenis Makanan", "Total Kalori"];
export const theadAlternatif = ["ID", "Tanggal", "Alternatif","Makanan", "Total Kalori"];
export const theadAllFood = ["ID","Kode", "Nama Makanan", "Protein", "Karbohidrat", "Lemak", "Deskripsi"];
export const theadKriteria = ["Kode", "Nama Kriteria"];
export const theadAllKriteria = ["Kode", "Nama Kriteria","Bobot", "Tren"];
export const theadCPI = ["ID", "Alternatif","Hasil", "Ranking"];
export const theadAllPenilaian = ["ID","Nama Makanan", "Protein", "Karbohidrat", "Lemak"];