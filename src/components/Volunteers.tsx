import { useTransition, animated } from 'react-spring';
import React from 'react';
import ContentLoader from 'react-content-loader';
import useSWR from 'swr';
import { GitHub, Instagram, Linkedin, Twitter } from 'react-feather';
import classnames from 'classnames';

type Volunteer = {
  name?: string;
  bio?: string;
  socials?: {
    twitter?: string;
    github?: string;
    linkedin?: string;
    instagram?: string;
  };
  image?: string;
};

const Icons = {
  twitter: <Twitter size={16} />,
  github: <GitHub size={16} />,
  linkedin: <Linkedin size={16} />,
  instagram: <Instagram size={16} />,
};

type VolunteerCardProps<T> = {
  volunteer?: Volunteer;
  style?: T;
};

// React.FC with generic props not possible -> https://stackoverflow.com/questions/59947787/generictype-in-react-fcpropst
function VolunteerCard<T>({ volunteer, style }: VolunteerCardProps<T>) {
  const [isLoaded, setIsLoaded] = React.useState(false);
  return (
    <animated.div className="volunteers__container__item" {...{ style }}>
      <div className="volunteers__container__item__image">
        {!isLoaded && (
          <ContentLoader
            backgroundColor="#888"
            foregroundColor="#888"
            backgroundOpacity={0.2}
            foregroundOpacity={0.4}
          >
            <rect x="0" y="0" rx="5" ry="5" width="75" height="75" />
          </ContentLoader>
        )}
        <img
          src={`https://volunteers.covid19india.org/images/${
            volunteer?.image ?? 'placeholder.jpg'
          }`}
          alt="img"
          onLoad={() => setIsLoaded(true)}
          style={{ display: isLoaded ? 'block' : 'none' }} // so that it doesn't show the alt text while loading.
        />
      </div>
      <div className="volunteers__container__item__details">
        <h2 className="volunteer__name">{volunteer?.name}</h2>
        <p>{volunteer?.bio}</p>
        <div className="volunteers__container__item__details__socials">
          {Object.entries(Icons).map(([key, value]) => {
            const social = key as keyof typeof Icons;
            if (volunteer?.socials?.[social]) {
              return (
                <a
                  key={key}
                  href={volunteer?.socials?.[social]}
                  target="_blank"
                  rel="noopener noreferrer" // https://stackoverflow.com/questions/50709625/link-with-target-blank-and-rel-noopener-noreferrer-still-vulnerable/50709760
                  className={classnames('icon', social)}
                >
                  {value}
                </a>
              );
            }
            return null;
          })}
        </div>
      </div>
    </animated.div>
  );
}

const Volunteers: React.FC = () => {
  const { data } = useSWR<Volunteer[]>(
    'https://volunteers.covid19india.org/data.json',
    (link) => fetch(link).then((res) => res.json()), // we can generate uniques 'key' here and append it to the data.
    {
      revalidateOnMount: true,
      suspense: true, // fallback to top-most suspense till load -> https://swr.vercel.app/docs/suspense
    }
  );

  const transitionCard = useTransition(data, {
    keys: (item) => item?.name ?? '',
    sort: (_, __) => (Math.random() > 0.5 ? 1 : -1),
    from: { opacity: 0, scale: 0.8 },
    enter: { opacity: 1, scale: 1 },
    leave: { opacity: 0, scale: 0 },
    config: { mass: 1, tension: 100, friction: 15 },
  });
  return (
    <div className="volunteers">
      <p className="fadeInUpAnimation">
        We would like to thank the hundreds of volunteers who, for the last 18
        months, extended their time and effort towards collating and publishing
        COVID-19 data for India.
      </p>
      <div className="volunteers__container">
        {transitionCard(
          (style, volunteer) =>
            volunteer && (
              <VolunteerCard
                volunteer={volunteer}
                key={volunteer.name}
                style={style}
              />
            )
        )}
        {data && (
          <div className="volunteers__container__item last">
            <VolunteerCard />
            <VolunteerCard />
            <VolunteerCard volunteer={{ bio: 'and many more...' }} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Volunteers;
