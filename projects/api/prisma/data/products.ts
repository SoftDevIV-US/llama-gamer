import CreateBrandDto from '@/brand/dto/create-brand.dto';
import CreateCategoryDto from '@/category/dto/create-category.dto';
import CreateCountryDto from '@/country/dto/create-country.dto';

const countries: CreateCountryDto[] = [
  { name: 'United States', tax: 0.08 },
  { name: 'Canada', tax: 0.05 },
  { name: 'Mexico', tax: 0.16 },
  { name: 'Brazil', tax: 0.29 },
  { name: 'Argentina', tax: 0.21 },
  { name: 'Colombia', tax: 0.19 },
  { name: 'Peru', tax: 0.18 },
  { name: 'Chile', tax: 0.19 },
  { name: 'Ecuador', tax: 0.12 },
  { name: 'Bolivia', tax: 0.13 },
  { name: 'Paraguay', tax: 0.1 },
  { name: 'Uruguay', tax: 0.22 },
  { name: 'Venezuela', tax: 0.16 },
  { name: 'United Kingdom', tax: 0.2 },
  { name: 'Germany', tax: 0.19 },
  { name: 'France', tax: 0.2 },
  { name: 'Italy', tax: 0.22 },
  { name: 'Spain', tax: 0.21 },
  { name: 'Netherlands', tax: 0.21 },
  { name: 'Belgium', tax: 0.21 },
  { name: 'Switzerland', tax: 0.07 },
  { name: 'Sweden', tax: 0.25 },
  { name: 'Norway', tax: 0.25 },
  { name: 'Denmark', tax: 0.25 },
  { name: 'Finland', tax: 0.24 },
  { name: 'Russia', tax: 0.2 },
  { name: 'China', tax: 0.13 },
  { name: 'Japan', tax: 0.1 },
  { name: 'South Korea', tax: 0.1 },
  { name: 'India', tax: 0.18 },
  { name: 'Australia', tax: 0.1 },
  { name: 'New Zealand', tax: 0.15 },
  { name: 'Indonesia', tax: 0.1 },
  { name: 'Philippines', tax: 0.12 },
  { name: 'Thailand', tax: 0.07 },
  { name: 'Vietnam', tax: 0.1 },
  { name: 'Malaysia', tax: 0.06 },
  { name: 'Singapore', tax: 0.07 },
  { name: 'Egypt', tax: 0.14 },
  { name: 'South Africa', tax: 0.15 },
  { name: 'Nigeria', tax: 0.07 },
  { name: 'Morocco', tax: 0.2 },
  { name: 'Algeria', tax: 0.19 },
  { name: 'Tunisia', tax: 0.18 },
  { name: 'Kenya', tax: 0.16 },
  { name: 'Ghana', tax: 0.12 },
  { name: 'Ivory Coast', tax: 0.18 },
  { name: 'Senegal', tax: 0.18 },
  { name: 'Cameroon', tax: 0.19 },
  { name: 'Madagascar', tax: 0.2 },
];

const brands: CreateBrandDto[] = [
  {
    name: 'Asus',
    logo: 'https://example.com/asus_logo.png',
  },
  {
    name: 'MSI',
    logo: 'https://example.com/msi_logo.png',
  },
  {
    name: 'Dell',
    logo: 'https://example.com/dell_logo.png',
  },
  {
    name: 'HP',
    logo: 'https://example.com/hp_logo.png',
  },
  {
    name: 'Lenovo',
    logo: 'https://example.com/lenovo_logo.png',
  },
  {
    name: 'Apple',
    logo: 'https://example.com/apple_logo.png',
  },
  {
    name: 'Acer',
    logo: 'https://example.com/acer_logo.png',
  },
  {
    name: 'Samsung',
    logo: 'https://example.com/samsung_logo.png',
  },
  {
    name: 'Toshiba',
    logo: 'https://example.com/toshiba_logo.png',
  },
  {
    name: 'Sony',
    logo: 'https://example.com/sony_logo.png',
  },
  {
    name: 'Microsoft',
    logo: 'https://example.com/microsoft_logo.png',
  },
  {
    name: 'LG',
    logo: 'https://example.com/lg_logo.png',
  },
  {
    name: 'Alienware',
    logo: 'https://example.com/alienware_logo.png',
  },
  {
    name: 'Razer',
    logo: 'https://example.com/razer_logo.png',
  },
  {
    name: 'Fujitsu',
    logo: 'https://example.com/fujitsu_logo.png',
  },
  {
    name: 'Panasonic',
    logo: 'https://example.com/panasonic_logo.png',
  },
  {
    name: 'Sharp',
    logo: 'https://example.com/sharp_logo.png',
  },
  {
    name: 'IBM',
    logo: 'https://example.com/ibm_logo.png',
  },
  {
    name: 'Gateway',
    logo: 'https://example.com/gateway_logo.png',
  },
  {
    name: 'Compaq',
    logo: 'https://example.com/compaq_logo.png',
  },
  {
    name: 'Xiaomi',
    logo: 'https://example.com/xiaomi_logo.png',
  },
  {
    name: 'Huawei',
    logo: 'https://example.com/huawei_logo.png',
  },
  {
    name: 'Google',
    logo: 'https://example.com/google_logo.png',
  },
  {
    name: 'ZTE',
    logo: 'https://example.com/zte_logo.png',
  },
  {
    name: 'Nokia',
    logo: 'https://example.com/nokia_logo.png',
  },
  {
    name: 'BlackBerry',
    logo: 'https://example.com/blackberry_logo.png',
  },
  {
    name: 'Motorola',
    logo: 'https://example.com/motorola_logo.png',
  },
  {
    name: 'OnePlus',
    logo: 'https://example.com/oneplus_logo.png',
  },
  {
    name: 'HTC',
    logo: 'https://example.com/htc_logo.png',
  },
  {
    name: 'Sony Ericsson',
    logo: 'https://example.com/sony_ericsson_logo.png',
  },
  {
    name: 'Siemens',
    logo: 'https://example.com/siemens_logo.png',
  },
  {
    name: 'Philips',
    logo: 'https://example.com/philips_logo.png',
  },
  {
    name: 'Alcatel',
    logo: 'https://example.com/alcatel_logo.png',
  },
  {
    name: 'TCL',
    logo: 'https://example.com/tcl_logo.png',
  },
  {
    name: 'Vivo',
    logo: 'https://example.com/vivo_logo.png',
  },
  {
    name: 'OPPO',
    logo: 'https://example.com/oppo_logo.png',
  },
  {
    name: 'Realme',
    logo: 'https://example.com/realme_logo.png',
  },
  {
    name: 'Infinix',
    logo: 'https://example.com/infinix_logo.png',
  },
  {
    name: 'Honor',
    logo: 'https://example.com/honor_logo.png',
  },
  {
    name: 'Meizu',
    logo: 'https://example.com/meizu_logo.png',
  },
  {
    name: 'LeEco',
    logo: 'https://example.com/leeco_logo.png',
  },
  {
    name: 'Coolpad',
    logo: 'https://example.com/coolpad_logo.png',
  },
  {
    name: 'Gionee',
    logo: 'https://example.com/gionee_logo.png',
  },
  {
    name: 'Micromax',
    logo: 'https://example.com/micromax_logo.png',
  },
  {
    name: 'Lava',
    logo: 'https://example.com/lava_logo.png',
  },
  {
    name: 'Karbonn',
    logo: 'https://example.com/karbonn_logo.png',
  },
  {
    name: 'Intex',
    logo: 'https://example.com/intex_logo.png',
  },
  {
    name: 'Spice',
    logo: 'https://example.com/spice_logo.png',
  },
];

const categories: CreateCategoryDto[] = [
  {
    name: 'Keyboard',
    image: 'https://example.com/keyboard.png',
  },
  {
    name: 'Mouse',
    image: 'https://example.com/mouse.png',
  },
  {
    name: 'Monitor',
    image: 'https://example.com/monitor.png',
  },
  {
    name: 'CPU',
    image: 'https://example.com/cpu.png',
  },
  {
    name: 'GPU',
    image: 'https://example.com/gpu.png',
  },
  {
    name: 'RAM',
    image: 'https://example.com/ram.png',
  },
  {
    name: 'Hard Drive',
    image: 'https://example.com/harddrive.png',
  },
  {
    name: 'SSD',
    image: 'https://example.com/ssd.png',
  },
  {
    name: 'Motherboard',
    image: 'https://example.com/motherboard.png',
  },
  {
    name: 'Power Supply',
    image: 'https://example.com/powersupply.png',
  },
  {
    name: 'Cooling System',
    image: 'https://example.com/coolingsystem.png',
  },
  {
    name: 'Operating System',
    image: 'https://example.com/operatingsystem.png',
  },
  {
    name: 'Graphics Card',
    image: 'https://example.com/graphicscard.png',
  },
  {
    name: 'Sound Card',
    image: 'https://example.com/soundcard.png',
  },
  {
    name: 'Network Card',
    image: 'https://example.com/networkcard.png',
  },
  {
    name: 'Webcam',
    image: 'https://example.com/webcam.png',
  },
  {
    name: 'Printer',
    image: 'https://example.com/printer.png',
  },
  {
    name: 'Scanner',
    image: 'https://example.com/scanner.png',
  },
  {
    name: 'Speakers',
    image: 'https://example.com/speakers.png',
  },
];

export { brands, categories, countries };
