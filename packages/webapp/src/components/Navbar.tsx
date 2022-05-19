import { Link } from 'react-router-dom'
import { FontAwesomeIcon, } from '@fortawesome/react-fontawesome';
import { faAppleWhole, faDrumstickBite } from '@fortawesome/free-solid-svg-icons';

faAppleWhole

type Props = {}


export default function Navbar({ }: Props) {
  return (
    <div className='min-w-[250px]'>
      <div className='static md:fixed md:top-0 md:left-0
                      m-0 w-full min-h-fit md:min-h-screen md:h-full min-w-max md:max-w-[250px] 
                      p-8 sm:border-r-2 bg-naplesYellow md:border-slate-400'>
        <header className='flex flex-row-reverse justify-end'>
          <span className='text-2xl'>
            Bonjour Louise
          </span>
          <img src='https://picsum.photos/150' alt="" className='w-10 mr-4 rounded-full md:mx-auto md:my-8' />
        </header>
        <nav className='flex md:flex-col'>
          {
            [
              ['Carte', '/carte', faDrumstickBite],
              ['Commandes', '/commandes', faAppleWhole],
              ['Historique', '/historique', faDrumstickBite],
              ['Paramètres', '/parametres', faDrumstickBite],
            ].map((item) => {
              const [label, path, icon]: (string | any)[] = item;
              return (
                <li key={label} className=' mx-1 list-none my-6 text-xl'>
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