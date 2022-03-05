import React, { Fragment } from 'react';
import Head from 'next/head';
import qs from 'qs';
import Image from 'next/image';
import PictoWechat from '@assets/svg/picto_wechat.svg';
import PictoEmail from '@assets/svg/picto_email.svg';
import PictoLinkedin from '@assets/svg/picto_linkedin.svg';
import PictoLocation from '@assets/svg/picto_location.svg';
import PictoPhone from '@assets/svg/picto_phone.svg';
import Layout from '@layout/Layout';
import CurriculumVitae from '@interfaces/curriculumVitae';
import cn from 'classnames';
import format from 'date-fns/format';
import s from '../styles/Home.module.css';

interface Props {
  cv: CurriculumVitae;
}

const Curriculum = ({ cv }: Props) => {
  const {
    name,
    title,
    introduction,
    dateOfBirth,
    wechatId,
    location,
    phone,
    linkedin,
    availability,
    email,
    createdAt,
    updatedAt,
    publishedAt,
    locale,
    educations,
    languages,
    skills,
    work_experiences,
    picture,
  } = cv.attributes;
  const pictureUrl = `${process.env.NEXT_PUBLIC_API_URL}${picture.data.attributes.formats.small.url}`;
  const formattedAvailability = format(new Date(availability), 'MMMM do, yyyy');
  const linkedinName = linkedin.split('/').pop();
  return (
    <Layout>
      <Head>
        <title>CV | {name}</title>
        <meta
          name='description'
          content='Remi LAK, front-end developer proficient with Reactjs, Typescript, and Redux. My informations and experiences about front-end software engineering until today.'
        />
      </Head>
      <div className={s.background}>
        <div className={s.container}>
          <section className={s.introduction}>
            <div className={s.profile}>
              <span className={s.profilePicture}>
                <Image
                  layout='fixed'
                  src={pictureUrl}
                  alt='Remi LAK'
                  width={250}
                  height={244}
                  priority
                />
              </span>
              <h1 className={s.firstLastName}>{name}</h1>
              <h2>{title}</h2>
            </div>
            <h3>Profile</h3>
            <p>{introduction}</p>
          </section>
          <section className={s.availability}>
            <h4>
              <span>Available after</span>
              <br /> {formattedAvailability}
            </h4>
          </section>
          <section className={s.informations}>
            <h3>Contact</h3>
            {wechatId && (
              <a
                className={cn(s.contactItem, s.wechat)}
                href={`weixin://dl/chat?${wechatId}`}
              >
                {wechatId}
                <span className={s.pictoContact}>
                  <PictoWechat />
                </span>
              </a>
            )}
            {email && (
              <a
                className={cn(s.contactItem, s.email)}
                href={`mailto:${email}`}
              >
                {email}
                <span className={s.pictoContact}>
                  <PictoEmail />
                </span>
              </a>
            )}
            {location && (
              <p className={cn(s.contactItem, s.location)}>
                {location}
                <span className={s.pictoContact}>
                  <PictoLocation />
                </span>
              </p>
            )}
            {phone && (
              <a className={cn(s.contactItem, s.phone)} href='tel:+33783411789'>
                {phone}
                <span className={s.pictoContact}>
                  <PictoPhone />
                </span>
              </a>
            )}
            {linkedin && (
              <a
                className={cn(s.contactItem, s.linkedin)}
                href={`https://${linkedin}`}
                target='_blank'
                rel='noreferrer'
              >
                {linkedinName}
                <span className={s.pictoContact}>
                  <PictoLinkedin />
                </span>
              </a>
            )}
          </section>
          <section className={s.education}>
            <h3>Education</h3>
            <ul className={s.educationList}>
              {educations.data.map((education) => {
                const key = `education-${education.id}`;

                const { diploma, school, location, startDate, endDate } =
                  education.attributes;
                return (
                  <li key={key} className={s.educationListItem}>
                    <h4>{diploma}</h4>
                    <p>{`${school}, ${location}`}</p>
                    <p>
                      <i>{`${format(new Date(startDate), 'yyyy')} - ${format(
                        new Date(endDate),
                        'yyyy'
                      )}`}</i>
                    </p>
                  </li>
                );
              })}
            </ul>
          </section>
          <section className={s.skills}>
            <h3>Skills</h3>
            <ul className={s.skillsList}>
              {skills.data.map((skill, index) => {
                const key = `skill-${skill.id}`;
                const { description } = skill.attributes;
                const isLast = index + 1 === skills.data.length;
                return (
                  <Fragment key={key}>
                    <li className={s.skillsListItem}>
                      {description}
                      {!isLast && ','}
                      <br />
                    </li>
                  </Fragment>
                );
              })}
            </ul>
          </section>
          <section className={s.languages}>
            <h3>Languages</h3>
            <ul className={s.languagesList}>
              {languages.data.map((language) => {
                const key = `language-${language.id}`;
                const { tongue, level } = language.attributes;

                return (
                  <li key={key} className={s.languageListItem}>
                    <b>{tongue}:&nbsp;</b>
                    <span>{level}</span>
                  </li>
                );
              })}
            </ul>
          </section>
          <section className={s.experiences}>
            <h3>Work experience</h3>
            <ul>
              {work_experiences.data.map((experience) => {
                const {
                  company,
                  position,
                  location,
                  startDate,
                  endDate,
                  currentPosition,
                  introduction,
                  description,
                  createdAt,
                  updatedAt,
                  publishedAt,
                  locale,
                  tasks,
                } = experience.attributes;
                const key = `experience-${experience.id}`;

                const formattedStartDate = format(
                  new Date(startDate),
                  'MMM yyyy'
                );
                const formattedEndDate = currentPosition
                  ? 'Today'
                  : format(new Date(endDate), 'MMM yyyy');

                return (
                  <li key={key} className={s.experience}>
                    <h4 className={s.experiencePosition}>
                      {position} | <i>{company}</i>
                    </h4>
                    <h5 className={s.experienceLocation}>
                      <span className={cn(s.pictoContact, s.pictoExperience)}>
                        <PictoLocation />
                      </span>
                      {location} |&nbsp;
                      <i>
                        {formattedStartDate} - {formattedEndDate}
                      </i>
                    </h5>

                    {tasks.data.length > 0 && (
                      <ul>
                        {tasks.data.map((task) => {
                          const key = `experience-task-${task.id}`;
                          const { description } = task.attributes;

                          return <li key={key}>{description}</li>;
                        })}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>
          </section>
        </div>
      </div>
    </Layout>
  );
};

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// revalidation is enabled and a new request comes in
export async function getStaticProps() {
  const query = qs.stringify(
    {
      populate: [
        'work_experiences',
        'work_experiences.tasks',
        'educations',
        'languages',
        'skills',
        'picture',
      ],
    },
    {
      encodeValuesOnly: true,
    }
  );
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/curriculum-vitae?${query}`
  );
  const json = await res.json();

  return {
    props: {
      cv: json.data,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    // revalidate: 10, // In seconds
  };
}

export default Curriculum;
