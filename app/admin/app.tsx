"use client";

import simpleRestProvider from "ra-data-simple-rest";
import polyglotI18nProvider from "ra-i18n-polyglot";
import frenchMessages from "ra-language-french";
import { Admin, Resource } from "react-admin";

import { CourseList } from "./cours/list";
import { CourseCreate } from "./cours/create";
import { CourseEdit } from "./cours/edit";

import { UnitList } from "./chapitre/list";
import { UnitCreate } from "./chapitre/create";
import { UnitEdit } from "./chapitre/edit";

import { LessonList } from "./classe/list";
import { LessonCreate } from "./classe/create";
import { LessonEdit } from "./classe/edit";

import { ChallengeList } from "./challenge/list";
import { ChallengeCreate } from "./challenge/create";
import { ChallengeEdit } from "./challenge/edit";

import { ChallengeOptionList } from "./challengeOption/list";
import { ChallengeOptionCreate } from "./challengeOption/create";
import { ChallengeOptionEdit } from "./challengeOption/edit";

const messages: { [key: string]: any } = {
  fr: frenchMessages,
};

const defaultLocale = "fr";

const i18nProvider = polyglotI18nProvider(
  (locale) => messages[locale],
  defaultLocale
);

const dataProvider = simpleRestProvider("/api");

const App = () => {
  return (
    <Admin dataProvider={dataProvider} i18nProvider={i18nProvider}>
      <Resource
        name="courses"
        list={CourseList}
        create={CourseCreate}
        edit={CourseEdit}
        recordRepresentation={"title"}
        options={{ label: "Cours" }}
      />
      <Resource
        name="units"
        list={UnitList}
        create={UnitCreate}
        edit={UnitEdit}
        recordRepresentation={"title"}
        options={{ label: "Chapitres" }}
      />
      <Resource
        name="lessons"
        list={LessonList}
        create={LessonCreate}
        edit={LessonEdit}
        recordRepresentation={"title"}
        options={{ label: "Classes" }}
      />
      <Resource
        name="challenges"
        list={ChallengeList}
        create={ChallengeCreate}
        edit={ChallengeEdit}
        recordRepresentation={"question"}
        options={{ label: "Challenges" }}
      />
      <Resource
        name="challengeOptions"
        list={ChallengeOptionList}
        create={ChallengeOptionCreate}
        edit={ChallengeOptionEdit}
        recordRepresentation={"text"}
        options={{ label: "Réponses" }}
      />
    </Admin>
  );
};

export default App;
