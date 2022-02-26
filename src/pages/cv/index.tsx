import React, { Fragment } from 'react';
import Head from 'next/head';
import qs from 'qs';
import Image from 'next/image';
import PictoWechat from '@assets/svg/picto_wechat.svg';
import PictoEmail from '@assets/svg/picto_email.svg';
import PictoLinkedin from '@assets/svg/picto_linkedin.svg';
import PictoLocation from '@assets/svg/picto_location.svg';
import PictoPhone from '@assets/svg/picto_phone.svg';
import CurriculumVitae from '@interfaces/curriculumVitae';
import cn from 'classnames';
import { eo } from 'date-fns/locale';
import format from 'date-fns/format';
import s from './style.module.css';

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
  return (
    <>
      <Head>
        <title>CV | {name}</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1'
        ></meta>
      </Head>
      <div className={s.container}>
        <span className={s.profilePicture}>
          <Image
            layout='fixed'
            src={pictureUrl}
            alt='Remi LAK'
            width={250}
            height={244}
          />
        </span>

        <section className={s.introduction}>
          <h1>{name}</h1>
          <h2>{title}</h2>
          <h3>Profile</h3>
          <p>{introduction}</p>
        </section>
        <hr className={s.introRule} />
        <section className={s.informations}>
          <h4 className={s.availability}>
            Available after {formattedAvailability}
          </h4>
          <h3>Contact</h3>
          {wechatId && (
            <p className={cn(s.contactItem, s.wechat)}>
              {wechatId}
              <span>
                <PictoWechat />
              </span>
            </p>
          )}
          {email && (
            <p className={cn(s.contactItem, s.email)}>
              {email}
              <span>
                <PictoEmail />
              </span>
            </p>
          )}
          {location && (
            <p className={cn(s.contactItem, s.location)}>
              {location}
              <span>
                <PictoLocation />
              </span>
            </p>
          )}
          {phone && (
            <p className={cn(s.contactItem, s.phone)}>
              {phone}
              <span>
                <PictoPhone />
              </span>
            </p>
          )}
          {linkedin && (
            <p className={cn(s.contactItem, s.linkedin)}>
              {linkedin}
              <span>
                <PictoLinkedin />
              </span>
            </p>
          )}
        </section>
        <section className={s.education}>
          <h3>Education</h3>
          {educations.data.map((education) => {
            const key = `education-${education.id}`;

            const { diploma, school, location, startDate, endDate } =
              education.attributes;
            return (
              <Fragment key={key}>
                <h4>{diploma}</h4>
                <p>{`${school}, ${location}`}</p>
                <p>
                  <i>{`${startDate}-${endDate}`}</i>
                </p>
              </Fragment>
            );
          })}
        </section>
        <section className={s.skills}>
          <h3>Skills</h3>
          {skills.data.map((skill) => {
            const key = `skill-${skill.id}`;
            const { description } = skill.attributes;

            return <span key={key}>{description}</span>;
          })}
        </section>
        <section className={s.languages}>
          <h3>Languages</h3>
          {languages.data.map((language) => {
            const key = `language-${language.id}`;
            const { tongue, level } = language.attributes;

            return (
              <p key={key}>
                <b>{tongue}:</b>
                {level}
              </p>
            );
          })}
        </section>
        <section className={s.experiences}>
          <h3>Work experience</h3>
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

            return (
              <Fragment key={key}>
                <h4>{position}</h4>
                <h5>
                  <i>
                    {location}, {startDate} - {endDate}
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
              </Fragment>
            );
          })}
        </section>
      </div>
    </>
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
    `http://localhost:1337/api/curriculum-vitae?${query}`
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
