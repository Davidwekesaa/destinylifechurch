// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'Dazzlers',
    path: '/dashboard/dazzlers',
    icon: '',
  },
  {
    title: 'Dreamers',
    path: '/dashboard/dreamers',
    icon: '',
  },
  {
    title: 'Dynamites',
    path: '/dashboard/dynamites',
    icon: '',
  },
  {
    title: 'Discoverers',
    path: '/dashboard/discoverers',
    icon: '',
  },
  {
    title: 'Doers',
    path: '/dashboard/doers',
    icon: '',
  },
];

export default navConfig;
