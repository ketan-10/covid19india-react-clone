import './App.scss';
import React, { useState, lazy, Suspense } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import NavBar from './components/NavBar';
import { Page } from './types/Types';
import { BASE_URL } from './Constants';
import { retry } from './utils/commonFunctions';
// import LanguageSwitcher from './components/LanguageSwitcher';

const LanguageSwitcher = lazy(() =>
  retry(() => import('./components/LanguageSwitcher'))
);

const App: React.FC = () => {
  const [showLanguageSwitcher, setShowLanguageSwitcher] = useState(false);
  const pages: Array<Page> = [
    {
      pageLink: '/',
      view: <Temp />,
      displayName: 'Home',
      showInNavbar: true,
    },
    {
      pageLink: '/blog',
      view: <>Blog</>,
      displayName: 'Blog',
      showInNavbar: true,
    },
    {
      pageLink: '/volunteers',
      view: <>Volunteers</>,
      displayName: 'Volunteers',
      showInNavbar: true,
    },
    {
      pageLink: '/about',
      view: <>About</>,
      displayName: 'About',
      showInNavbar: true,
    },
    {
      pageLink: '/state/:stateCode',
      view: <>State</>,
      displayName: 'State',
      showInNavbar: false,
    },
  ];
  return (
    <div className="app">
      <Router basename={BASE_URL}>
        <Suspense fallback={<div />}>
          <LanguageSwitcher
            {...{ showLanguageSwitcher, setShowLanguageSwitcher }}
          />
        </Suspense>

        <NavBar
          pages={pages}
          setShowLanguageSwitcher={setShowLanguageSwitcher}
        />
        <div className="page">
          <Switch>
            {pages.map((page) => (
              <Route exact path={page.pageLink} key={page.pageLink}>
                {page.view}
              </Route>
            ))}
            <Redirect to="/" />
          </Switch>
        </div>
      </Router>
    </div>
  );
};

const Temp: React.FC = () => (
  <div>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum
      deserunt, eligendi veritatis maiores dolorem aut culpa veniam modi animi
      delectus dolor officia ex quisquam explicabo ipsam fugiat. Quas amet,
      corporis sed consequuntur reprehenderit iusto! Neque sed earum magnam
      repudiandae iure laboriosam maxime quos totam nemo quae accusantium dolore
      et quia, labore quasi, omnis nostrum iste voluptate ducimus maiores sequi
      recusandae impedit aliquid consequatur. Praesentium quidem doloremque
      expedita necessitatibus? Sit voluptates in quae vitae minima, quod
      consectetur adipisci impedit facilis error asperiores? Rem mollitia ipsam
      non in quisquam est perferendis temporibus tenetur minus eveniet rerum,
      sed saepe blanditiis placeat provident atque adipisci quos, sint aliquid
      quia, exercitationem tempora! Incidunt nobis esse accusamus repellat animi
      debitis saepe veritatis, autem quos atque corporis itaque fuga unde quae
      at iure voluptatem consequatur velit! Laborum numquam eaque sunt ullam
      odit, assumenda veritatis recusandae quos? Ut doloribus ratione sint porro
      debitis sit nihil accusantium dolor vero inventore consequuntur
      consectetur placeat eum repudiandae odit provident velit maxime possimus
      aspernatur, eveniet, similique cupiditate quas deserunt distinctio. Nobis,
      quam veniam unde eaque quia maiores explicabo eveniet perferendis placeat
      vel iste sed quo! Similique deserunt, reiciendis vitae autem totam est!
      Eos ab totam fuga esse ratione repellat maxime, ipsam qui!
    </p>
    <p>
      Ab voluptatem cumque excepturi id. Blanditiis sed repellat, cum adipisci
      explicabo ratione, fugiat non eum, ipsum hic tempore. Eum facilis ab
      repudiandae eius dolores, fuga totam deleniti, aspernatur suscipit
      voluptatibus, fugit temporibus obcaecati. Quae error optio inventore iure
      animi voluptas illo vitae quod molestiae nobis consequatur, repellat quos
      assumenda. Inventore quaerat voluptates animi eos ipsa accusamus facere
      tenetur quis aspernatur minus dolor commodi, quae provident reiciendis
      quo! Velit quasi magnam voluptatibus veniam tempore consectetur, sequi ex
      non dolorum labore libero corrupti inventore laborum quibusdam error
      praesentium maxime, omnis deserunt. Exercitationem impedit dolor suscipit
      quod commodi veritatis illo temporibus quia nulla officiis quas ullam
      deserunt alias fuga ducimus dolore natus omnis, delectus, animi eum fugit
      necessitatibus. Ut perferendis incidunt molestias nisi, reiciendis,
      deserunt fuga quia asperiores odio consequatur nesciunt amet dolor
      repellat maiores laboriosam ducimus architecto adipisci! Saepe molestias
      cumque vero eius magni consectetur, sint minus impedit neque ipsam ullam
      amet labore nam velit distinctio, ea exercitationem. Est, odit adipisci
      tempora sed atque aliquid debitis magni! Quam voluptates temporibus animi
      neque blanditiis! Commodi cumque, quos fugiat similique dicta, est ipsa
      quisquam consequatur sint eligendi quia. Quia voluptatem impedit quibusdam
      repudiandae tempore, sed in saepe esse dolorum at minima! Vero, assumenda
      placeat.
    </p>
    <p>
      Autem voluptate, error et aspernatur explicabo voluptas optio enim
      accusantium possimus necessitatibus, sint magnam sunt. Illum ducimus
      blanditiis, beatae rem earum, consectetur sed cumque consequuntur officia
      soluta fugit sit maiores quo corporis animi cum nobis nulla eveniet,
      pariatur assumenda. Laborum doloremque sed inventore alias deleniti
      laboriosam odit ut facilis temporibus ullam, cum quas facere beatae
      pariatur ipsa nesciunt maiores velit et tempora eum magnam dolorem
      voluptate! Dolor cumque a ipsam eveniet illo perferendis architecto
      asperiores sapiente placeat maiores consequatur reiciendis facilis
      aspernatur repellat, quis alias ipsa. Soluta illo eos est voluptas. Error
      dolores quae consectetur quidem. Sint illo libero amet dolores sapiente
      eveniet autem, sed optio excepturi aliquid delectus facere cum alias ut
      expedita hic obcaecati reiciendis ducimus repellat soluta asperiores,
      animi dolore voluptatum! Repudiandae, optio voluptas accusantium, ad
      ullam, suscipit fugiat cupiditate ipsa architecto dolores officia non
      quasi pariatur sequi qui dicta blanditiis. Obcaecati at sunt culpa tempore
      cum et autem nostrum voluptates optio amet aliquam consequatur natus
      debitis quam velit, pariatur, id iste alias, asperiores maiores nisi.
      Eaque quos vitae, deleniti numquam quas atque? Dolorem modi magnam enim
      porro unde ipsa, esse delectus saepe odio ab perferendis. Necessitatibus
      sequi animi nihil minus nesciunt eligendi autem velit? Autem, repudiandae.
    </p>
    <p>
      Temporibus veritatis debitis corrupti repellat. Veritatis inventore,
      aperiam ipsam iusto ullam perferendis tempora provident quia at, corporis
      magnam sunt incidunt pariatur deleniti officia, commodi nam tempore. At
      quam asperiores quis vitae distinctio architecto nostrum vel reiciendis
      eius! Aliquid ducimus dignissimos sapiente veniam veritatis eos cumque
      labore optio quidem temporibus deserunt, id perspiciatis odio dolorem
      fugit illo reprehenderit, in accusantium, repudiandae repellat dolor? Sed
      impedit numquam dolorum quo. Facere, ipsum minima numquam quam obcaecati
      cupiditate doloremque dolor praesentium enim. Blanditiis eum praesentium
      magnam autem minus doloribus, architecto omnis esse accusantium labore
      ipsum, ex deleniti consequuntur error. Explicabo aliquam unde accusantium
      id, qui ipsa tempore consequatur obcaecati, veniam eius iusto minus, at
      laboriosam perspiciatis repellendus totam ipsam voluptatem nemo. Quae
      autem ut magni itaque at, quam ipsa amet nisi. Quos vel nisi accusantium
      blanditiis aspernatur perspiciatis sit illo, earum porro nam assumenda
      mollitia modi dolor praesentium ratione ut necessitatibus ad cum, officiis
      dolore consequuntur eaque? Voluptas expedita est aliquam explicabo quaerat
      et fugit nemo, repellat quasi quibusdam maxime libero laudantium autem
      officia officiis fugiat accusantium quod consequuntur minima id
      architecto? Accusantium ea dolorum iste voluptatibus, sequi labore ipsam
      dicta? Aliquid laborum facere dolorum quasi molestias, accusantium sit
      corporis veritatis iure numquam amet.
    </p>
    <p>
      Ea alias illum doloremque, ullam perferendis deserunt totam aperiam
      laboriosam itaque? Suscipit nisi culpa obcaecati quae fugit vitae
      exercitationem, deleniti voluptatibus esse reiciendis blanditiis magni
      voluptate velit. Natus laborum distinctio est cum accusamus sit,
      repellendus doloremque qui odit consectetur blanditiis quaerat explicabo
      debitis dignissimos dolores laboriosam laudantium cupiditate eligendi
      neque doloribus consequuntur ullam officiis quam? Tenetur impedit incidunt
      vel recusandae est illo accusantium eum, natus sint dolor fuga molestias
      asperiores, earum debitis amet consectetur. Inventore cumque recusandae
      porro tenetur rem in. Repellendus facere officiis beatae at maxime
      laudantium nam quasi omnis harum laborum nesciunt totam corporis
      perspiciatis molestias reiciendis dicta blanditiis, explicabo quisquam
      placeat molestiae possimus officia? Dolore consectetur numquam alias quasi
      repudiandae molestias voluptatum perferendis, harum nulla modi deleniti,
      assumenda tempore. Omnis ex aut laudantium, aperiam iste quas consequatur
      minima cupiditate incidunt vel corrupti natus sed ab ipsa provident neque
      odit vero. Possimus, error mollitia sed sint animi dolorum cumque libero
      totam delectus porro accusantium iure cupiditate! Beatae, culpa placeat
      nam unde accusamus expedita iste repudiandae sapiente dolor accusantium
      similique itaque possimus delectus mollitia aliquid neque fugiat, vitae
      alias qui ut et inventore doloribus eos. Deleniti, nisi aut placeat
      reiciendis quos nam rerum fugiat a beatae sapiente. Incidunt, dignissimos.
    </p>
  </div>
);
export default App;
