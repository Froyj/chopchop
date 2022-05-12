import { Link } from 'react-router-dom'
import { FontAwesomeIcon, } from '@fortawesome/react-fontawesome';
import { faAppleWhole, faDrumstickBite } from '@fortawesome/free-solid-svg-icons';

faAppleWhole

type Props = {}


export default function Navbar({ }: Props) {
  return (
    <div className='min-w-[250px]'>
      <div className='fixed border-r-2 border-slate-400 h-100 min-h-screen p-8 top-0 left-0 right-0 w-1/5 min-w-max max-w-[250px]'>
        <header className=''>
          <span className='text-2xl'>
            Bonjour Louise
          </span>
          <img src='https://picsum.photos/150' alt="" className='rounded-full mx-auto my-8' />
        </header>
        <nav className='flex flex-col'>
          {
            [
              ['Carte', '/carte', faDrumstickBite],
              ['Commandes', '/commandes', faAppleWhole],
              ['Historique', '/historique', faDrumstickBite],
              ['Paramètres', '/parametres', faDrumstickBite],
            ].map((item) => {
              const [label, path, icon]: (string | any)[] = item;
              return (
                <li key={label} className='list-none my-6 text-xl'>
                  <Link to={path}>
                    <div className='rounded-lg border-2 border-slate-400 p-2'>
                      {icon && <FontAwesomeIcon icon={icon} className='mr-2' />}
                      {label}
                    </div>
                  </Link>
                </li>
              )
            })
          }
        </nav>
      </div>
    </div>
  )
}