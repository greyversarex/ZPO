export type Language = 'tj' | 'ru' | 'en';

export const translations = {
  tj: {
    header: {
      title: "Корхонаи давлатии протезию ортопедии Душанбе",
      shortTitle: "Заводи протезию ортопедӣ",
      nav: {
        home: "Асосӣ",
        about: "Дар бораи мо",
        products: "Маҳсулот",
        patients: "Ба беморон",
        contacts: "Тамос"
      },
      ctaButton: "Тамос бо мо"
    },

    hero: {
      headline: "Барқарорсозии ҳаракат – Таъмини ҳаёти шоиста",
      subheadline: "Истеҳсоли протезҳо, воситаҳои ортопедӣ ва тавонбахшии маъюбон дар сатҳи давлатӣ",
      stats: [
        { number: "4", label: "Филиал" },
        { number: "100%", label: "Хизматрасонии ройгон" },
        { number: "35+", label: "Сол таҷриба" }
      ]
    },

    about: {
      title: "Дар бораи корхона",
      subtitle: "Корхонаи давлатии зери назорати Вазорати тандурустӣ ва ҳифзи иҷтимоии аҳолии Ҷумҳурии Тоҷикистон",
      mission: "Мақсади асосии мо тавонбахшӣ ва барқарорсозии маъюбон, инчунин интегратсияи онҳо ба ҷомеа мебошад. Мо дар асоси Қонуни Ҷумҳурии Тоҷикистон «Дар бораи ҳифзи иҷтимоии маъюбон» фаъолият менамоем.",
      
      leadershipTitle: "Роҳбарият",
      leaders: [
        {
          name: "Муҳаббатов Зафар Ҳукумович",
          position: "Директори генералӣ",
          description: ""
        },
        {
          name: "Латифӣ Усмоналӣ Ноибпур",
          position: "Муовини директори генералӣ",
          description: ""
        }
      ],
      departments: {
        title: "Шӯъбаҳо",
        list: [
          "Шӯъбаи молия ва нақшагирӣ",
          "Шӯъбаи кадрҳо",
          "Шӯъбаи ҳуқуқӣ"
        ]
      },
      
      branchesTitle: "Филиалҳо",
      branches: [
        {
          name: "Идораи марказӣ",
          city: "ш. Душанбе",
          director: "",
          address: "Ноҳияи Шоҳмансур, кӯчаи Қаротегин 1",
          phones: ["(+992 37) 225-43-20", "(+992 37) 225-57-97", "(+992 37) 225-45-15"],
          email: "seop.dushanbe@gmail.com",
          note: "",
          established: "",
          mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3052.5!2d68.7738!3d38.5598!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzjCsDMzJzM1LjMiTiA2OMKwNDYnMjUuNyJF!5e0!3m2!1sen!2s!4v1"
        },
        {
          name: "Филиали Хуҷанд",
          city: "ш. Хуҷанд",
          director: "Хусрав Миррачабов",
          address: "Кӯчаи Пайрав Сулаймонӣ 7",
          phones: ["+992 (3422) 6-16-10"],
          email: "",
          note: "Барои беморони дурдаст шароити истироҳат ва шабмонӣ мавҷуд аст",
          established: "1989",
          mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3000!2d69.6219!3d40.2828!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDE2JzU4LjEiTiA2OcKwMzcnMTguOCJF!5e0!3m2!1sen!2s!4v1"
        },
        {
          name: "Филиали Кӯлоб",
          city: "ш. Кӯлоб",
          director: "Бахтиёр Рустамов",
          address: "Кӯчаи Борбад 33",
          phones: ["+992 98-106-68-08"],
          email: "",
          note: "Барои беморони дурдаст шароити истироҳат ва шабмонӣ мавҷуд аст",
          established: "1993",
          mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3100!2d69.7850!3d37.9100!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzfCsDU0JzM2LjAiTiA2OcKwNDcnMDYuMCJF!5e0!3m2!1sen!2s!4v1"
        },
        {
          name: "Филиали Хоруғ",
          city: "ш. Хоруғ",
          director: "",
          address: "",
          phones: [],
          email: "",
          note: "",
          established: "",
          mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3100!2d71.5537!3d37.4894!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzfCsDI5JzIxLjgiTiA3McKwMzMnMTMuMyJF!5e0!3m2!1sen!2s!4v1"
        }
      ]
    },

    workshops: {
      title: "Истеҳсолот ва хизматрасонӣ",
      subtitle: "Чор сехи тахассусӣ барои таъмини маҳсулот ва хизматрасонии босифат",
      items: [
        {
          id: 1,
          name: "Сехи №1 – Протезҳо",
          shortName: "Протезҳо",
          description: "Истеҳсоли протезҳо ва ортезҳои андомҳои болоӣ ва поёнӣ, камарбандҳо, гарданбандҳои пластикӣ, дастгоҳҳои фиксатсия, дастгоҳҳо барои илоҷи пои каҷ (Шина Сито, Велинский).",
          icon: "Accessibility"
        },
        {
          id: 2,
          name: "Сехи №2 – Пойафзол",
          shortName: "Пойафзол",
          description: "Истеҳсоли пойафзолҳои ортопедӣ барои калонсолон ва кӯдакон, зерпоякҳои чармӣ ва махсус.",
          icon: "Footprints"
        },
        {
          id: 3,
          name: "Сехи №3 – Воситаҳои ҳаракатӣ",
          shortName: "Воситаҳои ҳаракатӣ",
          description: "Истеҳсоли роҳгардакҳо, воситаҳои кӯмакӣ барои роҳгардӣ, асоҳо, аробачаҳои хурд, болиштчаҳои ортопедӣ, вертикализаторҳо.",
          icon: "Armchair"
        },
        {
          id: 4,
          name: "Сехи №4 – Тавонбахшӣ",
          shortName: "Тавонбахшӣ",
          description: "Ташхис, тавсияҳо оид ба интихоби воситаҳои ёрирасон, омӯзиши ҳаёти рӯзмарра ва худидоракунӣ.",
          icon: "HeartHandshake"
        }
      ]
    },

    patientGuide: {
      title: "Роҳнамо барои беморон",
      subtitle: "Маълумоти муҳим оид ба хизматрасонии ройгон ва раванди қабул",
      tabs: [
        {
          id: "eligibility",
          title: "Кӣ ҳуқуқи ройгон дорад?",
          content: "Маъюбони гурӯҳи I ва II, кӯдакони маъюби то 18-сола, иштирокчиёни Ҷанги Бузурги Ватанӣ ва шахсони ба онҳо баробаршуда ҳуқуқи гирифтани хизматрасонии ройгон доранд. Ин ҳуқуқ тибқи Қарори Ҳукумати Ҷумҳурии Тоҷикистон №604 таъмин карда мешавад."
        },
        {
          id: "documents",
          title: "Ҳуҷҷатҳои зарурӣ",
          items: [
            "Ариза ба мақомоти ҳифзи иҷтимоӣ",
            "Шиноснома (нусхаи аслӣ ва нусхабардорӣ)",
            "Маълумотномаи маъюбӣ аз Комиссияи тиббии иҷтимоӣ (МСЭ)",
            "Барномаи инфиродии тавонбахшӣ (ИПР)"
          ]
        },
        {
          id: "process",
          title: "Раванди қабул",
          steps: [
            { step: 1, title: "Пешниҳоди ариза", description: "Ариза ва ҳуҷҷатҳои зарурӣ ба мақомоти ҳифзи иҷтимоӣ пешниҳод кунед" },
            { step: 2, title: "Баррасии ҳуҷҷатҳо", description: "Баррасӣ то 15 рӯз давом мекунад" },
            { step: 3, title: "Андозагирӣ ва истеҳсол", description: "Андозагирӣ ва истеҳсоли протез ё воситаи ёрирасон" },
            { step: 4, title: "Тавонбахшӣ", description: "Гузаронидани курси тавонбахшӣ ва омӯзиши истифодаи маҳсулот" }
          ]
        }
      ]
    },

    contact: {
      title: "Тамос",
      subtitle: "Барои маълумоти бештар бо мо тамос гиред",
      address: {
        title: "Суроға",
        full: "734024, ш. Душанбе, кӯчаи Қаротегин 1"
      },
      phone: {
        title: "Телефон",
        numbers: ["(+992 37) 225-43-20", "(+992 37) 225-45-15"]
      },
      email: {
        title: "Почтаи электронӣ",
        address: "seop.dushanbe@gmail.com"
      },
      hours: {
        title: "Соатҳои корӣ",
        schedule: "Душанбе - Ҷумъа: 8:00 - 17:00",
        weekend: "Шанбе - Якшанбе: Истироҳат"
      },
      form: {
        title: "Савол доред?",
        namePlaceholder: "Номи шумо",
        phonePlaceholder: "Телефони шумо",
        emailPlaceholder: "Почтаи электронӣ",
        messagePlaceholder: "Паёми шумо",
        submitButton: "Фиристодан",
        sending: "Фиристода истодааст...",
        successMessage: "Паёми шумо бомуваффақият фиристода шуд!",
        errorMessage: "Хатогӣ рӯй дод. Лутфан дубора кӯшиш кунед."
      }
    },

    footer: {
      copyright: "© 2025 Корхонаи давлатии протезию ортопедии Душанбе. Ҳамаи ҳуқуқҳо маҳфузанд.",
      ministry: "Вазорати тандурустӣ ва ҳифзи иҷтимоии аҳолии Ҷумҳурии Тоҷикистон",
      address: "734024, ш. Душанбе, кӯчаи Қаротегин 1",
      phones: ["(+992 37) 225-43-20", "(+992 37) 225-45-15"],
      email: "seop.dushanbe@gmail.com"
    },

    common: {
      learnMore: "Маълумоти бештар",
      viewAll: "Ҳама",
      established: "Таъсис",
      director: "Директор",
      address: "Суроға",
      phone: "Телефон",
      email: "Почта",
      note: "Эзоҳ",
      back: "Бозгашт"
    }
  },

  ru: {
    header: {
      title: "Государственное предприятие протезно-ортопедический завод Душанбе",
      shortTitle: "Завод протезно-ортопедический",
      nav: {
        home: "Главная",
        about: "О нас",
        products: "Продукция",
        patients: "Пациентам",
        contacts: "Контакты"
      },
      ctaButton: "Связаться"
    },

    hero: {
      headline: "Восстановление движения – Обеспечение достойной жизни",
      subheadline: "Производство протезов, ортопедических изделий и реабилитация инвалидов на государственном уровне",
      stats: [
        { number: "4", label: "Филиала" },
        { number: "100%", label: "Бесплатное обслуживание" },
        { number: "35+", label: "Лет опыта" }
      ]
    },

    about: {
      title: "О предприятии",
      subtitle: "Государственное предприятие под надзором Министерства здравоохранения и социальной защиты населения Республики Таджикистан",
      mission: "Наша основная цель – реабилитация и восстановление инвалидов, а также их интеграция в общество. Мы работаем на основе Закона Республики Таджикистан «О социальной защите инвалидов».",
      
      leadershipTitle: "Руководство",
      leaders: [
        {
          name: "Мухаббатов Зафар Хукумович",
          position: "Генеральный директор",
          description: ""
        },
        {
          name: "Латифи Усмонали Ноибпур",
          position: "Заместитель генерального директора",
          description: ""
        }
      ],
      departments: {
        title: "Отделы",
        list: [
          "Отдел финансов и планирования",
          "Отдел кадров",
          "Юридический отдел"
        ]
      },
      
      branchesTitle: "Филиалы",
      branches: [
        {
          name: "Головной офис",
          city: "г. Душанбе",
          director: "",
          address: "Район Шохмансур, ул. Каратегин 1",
          phones: ["(+992 37) 225-43-20", "(+992 37) 225-57-97", "(+992 37) 225-45-15"],
          email: "seop.dushanbe@gmail.com",
          note: "",
          established: "",
          mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3052.5!2d68.7738!3d38.5598!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzjCsDMzJzM1LjMiTiA2OMKwNDYnMjUuNyJF!5e0!3m2!1sen!2s!4v1"
        },
        {
          name: "Худжандский филиал",
          city: "г. Худжанд",
          director: "Хусрав Миррачабов",
          address: "ул. Пайрав Сулаймони 7",
          phones: ["+992 (3422) 6-16-10"],
          email: "",
          note: "Для пациентов из отдаленных районов предусмотрены условия для проживания",
          established: "1989",
          mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3000!2d69.6219!3d40.2828!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDE2JzU4LjEiTiA2OcKwMzcnMTguOCJF!5e0!3m2!1sen!2s!4v1"
        },
        {
          name: "Кулябский филиал",
          city: "г. Куляб",
          director: "Бахтиёр Рустамов",
          address: "ул. Борбад 33",
          phones: ["+992 98-106-68-08"],
          email: "",
          note: "Для пациентов из отдаленных районов предусмотрены условия для проживания",
          established: "1993",
          mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3100!2d69.7850!3d37.9100!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzfCsDU0JzM2LjAiTiA2OcKwNDcnMDYuMCJF!5e0!3m2!1sen!2s!4v1"
        },
        {
          name: "Хорогский филиал",
          city: "г. Хорог",
          director: "",
          address: "",
          phones: [],
          email: "",
          note: "",
          established: "",
          mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3100!2d71.5537!3d37.4894!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzfCsDI5JzIxLjgiTiA3McKwMzMnMTMuMyJF!5e0!3m2!1sen!2s!4v1"
        }
      ]
    },

    workshops: {
      title: "Производство и услуги",
      subtitle: "Четыре специализированных цеха для обеспечения качественной продукции и услуг",
      items: [
        {
          id: 1,
          name: "Цех №1 – Протезы",
          shortName: "Протезы",
          description: "Производство протезов и ортезов для верхних и нижних конечностей, поясов, пластиковых воротников, фиксирующих устройств, устройств для лечения косолапости (Шина Сито, Велинского).",
          icon: "Accessibility"
        },
        {
          id: 2,
          name: "Цех №2 – Обувь",
          shortName: "Обувь",
          description: "Производство ортопедической обуви для взрослых и детей, кожаных и специальных стелек.",
          icon: "Footprints"
        },
        {
          id: 3,
          name: "Цех №3 – Средства передвижения",
          shortName: "Средства передвижения",
          description: "Производство ходунков, вспомогательных средств для ходьбы, тростей, малых колясок, ортопедических подушек, вертикализаторов.",
          icon: "Armchair"
        },
        {
          id: 4,
          name: "Цех №4 – Реабилитация",
          shortName: "Реабилитация",
          description: "Диагностика, рекомендации по подбору вспомогательных средств, обучение повседневной жизни и самообслуживанию.",
          icon: "HeartHandshake"
        }
      ]
    },

    patientGuide: {
      title: "Руководство для пациентов",
      subtitle: "Важная информация о бесплатном обслуживании и процессе приёма",
      tabs: [
        {
          id: "eligibility",
          title: "Кто имеет право на бесплатное обслуживание?",
          content: "Инвалиды I и II группы, дети-инвалиды до 18 лет, участники Великой Отечественной войны и приравненные к ним лица имеют право на бесплатное обслуживание. Это право обеспечивается Постановлением Правительства Республики Таджикистан №604."
        },
        {
          id: "documents",
          title: "Необходимые документы",
          items: [
            "Заявление в органы социальной защиты",
            "Удостоверение личности (оригинал и копия)",
            "Справка об инвалидности от медико-социальной экспертизы (МСЭ)",
            "Индивидуальная программа реабилитации (ИПР)"
          ]
        },
        {
          id: "process",
          title: "Процесс приёма",
          steps: [
            { step: 1, title: "Подача заявления", description: "Подайте заявление и необходимые документы в органы социальной защиты" },
            { step: 2, title: "Рассмотрение документов", description: "Рассмотрение занимает до 15 дней" },
            { step: 3, title: "Измерение и изготовление", description: "Снятие мерок и изготовление протеза или вспомогательного средства" },
            { step: 4, title: "Реабилитация", description: "Прохождение курса реабилитации и обучение использованию изделия" }
          ]
        }
      ]
    },

    contact: {
      title: "Контакты",
      subtitle: "Свяжитесь с нами для получения дополнительной информации",
      address: {
        title: "Адрес",
        full: "734024, г. Душанбе, ул. Каратегин 1"
      },
      phone: {
        title: "Телефон",
        numbers: ["(+992 37) 225-43-20", "(+992 37) 225-45-15"]
      },
      email: {
        title: "Электронная почта",
        address: "seop.dushanbe@gmail.com"
      },
      hours: {
        title: "Часы работы",
        schedule: "Понедельник - Пятница: 8:00 - 17:00",
        weekend: "Суббота - Воскресенье: Выходной"
      },
      form: {
        title: "Есть вопросы?",
        namePlaceholder: "Ваше имя",
        phonePlaceholder: "Ваш телефон",
        emailPlaceholder: "Электронная почта",
        messagePlaceholder: "Ваше сообщение",
        submitButton: "Отправить",
        sending: "Отправка...",
        successMessage: "Ваше сообщение успешно отправлено!",
        errorMessage: "Произошла ошибка. Попробуйте еще раз."
      }
    },

    footer: {
      copyright: "© 2025 Государственное предприятие протезно-ортопедический завод Душанбе. Все права защищены.",
      ministry: "Министерство здравоохранения и социальной защиты населения Республики Таджикистан",
      address: "734024, г. Душанбе, ул. Каратегин 1",
      phones: ["(+992 37) 225-43-20", "(+992 37) 225-45-15"],
      email: "seop.dushanbe@gmail.com"
    },

    common: {
      learnMore: "Подробнее",
      viewAll: "Все",
      established: "Основан",
      director: "Директор",
      address: "Адрес",
      phone: "Телефон",
      email: "Почта",
      note: "Примечание",
      back: "Назад"
    }
  },

  en: {
    header: {
      title: "State Enterprise Prosthetic and Orthopedic Plant of Dushanbe",
      shortTitle: "Prosthetic & Orthopedic Plant",
      nav: {
        home: "Home",
        about: "About Us",
        products: "Products",
        patients: "For Patients",
        contacts: "Contacts"
      },
      ctaButton: "Contact Us"
    },

    hero: {
      headline: "Restoring Movement – Ensuring a Dignified Life",
      subheadline: "Manufacturing prosthetics, orthopedic devices and rehabilitation of persons with disabilities at the state level",
      stats: [
        { number: "4", label: "Branches" },
        { number: "100%", label: "Free Services" },
        { number: "35+", label: "Years Experience" }
      ]
    },

    about: {
      title: "About the Enterprise",
      subtitle: "State enterprise under the supervision of the Ministry of Health and Social Protection of the Republic of Tajikistan",
      mission: "Our main goal is the rehabilitation and recovery of persons with disabilities, as well as their integration into society. We operate under the Law of the Republic of Tajikistan 'On Social Protection of Persons with Disabilities'.",
      
      leadershipTitle: "Leadership",
      leaders: [
        {
          name: "Muhabbatov Zafar Hukumovich",
          position: "Director General",
          description: ""
        },
        {
          name: "Latifi Usmonali Noibpur",
          position: "Deputy Director General",
          description: ""
        }
      ],
      departments: {
        title: "Departments",
        list: [
          "Finance and Planning Department",
          "Human Resources Department",
          "Legal Department"
        ]
      },
      
      branchesTitle: "Branches",
      branches: [
        {
          name: "Headquarters",
          city: "Dushanbe",
          director: "",
          address: "Shohmansur District, Karategin St. 1",
          phones: ["(+992 37) 225-43-20", "(+992 37) 225-57-97", "(+992 37) 225-45-15"],
          email: "seop.dushanbe@gmail.com",
          note: "",
          established: "",
          mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3052.5!2d68.7738!3d38.5598!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzjCsDMzJzM1LjMiTiA2OMKwNDYnMjUuNyJF!5e0!3m2!1sen!2s!4v1"
        },
        {
          name: "Khujand Branch",
          city: "Khujand",
          director: "Khusrav Mirrajabov",
          address: "Pairav Sulaymoni St. 7",
          phones: ["+992 (3422) 6-16-10"],
          email: "",
          note: "Overnight accommodation available for patients from distant areas",
          established: "1989",
          mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3000!2d69.6219!3d40.2828!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDE2JzU4LjEiTiA2OcKwMzcnMTguOCJF!5e0!3m2!1sen!2s!4v1"
        },
        {
          name: "Kulob Branch",
          city: "Kulob",
          director: "Bakhtier Rustamov",
          address: "Borbad St. 33",
          phones: ["+992 98-106-68-08"],
          email: "",
          note: "Overnight accommodation available for patients from distant areas",
          established: "1993",
          mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3100!2d69.7850!3d37.9100!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzfCsDU0JzM2LjAiTiA2OcKwNDcnMDYuMCJF!5e0!3m2!1sen!2s!4v1"
        },
        {
          name: "Khorog Branch",
          city: "Khorog",
          director: "",
          address: "",
          phones: [],
          email: "",
          note: "",
          established: "",
          mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3100!2d71.5537!3d37.4894!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzfCsDI5JzIxLjgiTiA3McKwMzMnMTMuMyJF!5e0!3m2!1sen!2s!4v1"
        }
      ]
    },

    workshops: {
      title: "Production and Services",
      subtitle: "Four specialized workshops providing quality products and services",
      items: [
        {
          id: 1,
          name: "Workshop #1 – Prosthetics",
          shortName: "Prosthetics",
          description: "Manufacturing prosthetics and orthotics for upper and lower limbs, belts, plastic collars, fixation devices, devices for treating clubfoot (Shina Sito, Velinsky).",
          icon: "Accessibility"
        },
        {
          id: 2,
          name: "Workshop #2 – Footwear",
          shortName: "Footwear",
          description: "Manufacturing orthopedic shoes for adults and children, leather and specialized insoles.",
          icon: "Footprints"
        },
        {
          id: 3,
          name: "Workshop #3 – Mobility Devices",
          shortName: "Mobility Devices",
          description: "Manufacturing walkers, walking aids, canes, small wheelchairs, orthopedic pillows, standing frames.",
          icon: "Armchair"
        },
        {
          id: 4,
          name: "Workshop #4 – Rehabilitation",
          shortName: "Rehabilitation",
          description: "Diagnostics, recommendations for assistive device selection, training for daily living and self-care.",
          icon: "HeartHandshake"
        }
      ]
    },

    patientGuide: {
      title: "Patient Guide",
      subtitle: "Important information about free services and the admission process",
      tabs: [
        {
          id: "eligibility",
          title: "Who is eligible for free services?",
          content: "Persons with disabilities of groups I and II, children with disabilities under 18 years old, Great Patriotic War veterans and equivalent persons are entitled to free services. This right is guaranteed by Resolution No. 604 of the Government of the Republic of Tajikistan."
        },
        {
          id: "documents",
          title: "Required Documents",
          items: [
            "Application to social protection authorities",
            "ID card (original and copy)",
            "Disability certificate from Medical-Social Expertise (MSE)",
            "Individual Rehabilitation Program (IRP)"
          ]
        },
        {
          id: "process",
          title: "Admission Process",
          steps: [
            { step: 1, title: "Submit Application", description: "Submit application and required documents to social protection authorities" },
            { step: 2, title: "Document Review", description: "Review takes up to 15 days" },
            { step: 3, title: "Measurement and Manufacturing", description: "Taking measurements and manufacturing prosthesis or assistive device" },
            { step: 4, title: "Rehabilitation", description: "Completing rehabilitation course and training on product use" }
          ]
        }
      ]
    },

    contact: {
      title: "Contact Us",
      subtitle: "Get in touch with us for more information",
      address: {
        title: "Address",
        full: "734024, Dushanbe, Karategin St. 1"
      },
      phone: {
        title: "Phone",
        numbers: ["(+992 37) 225-43-20", "(+992 37) 225-45-15"]
      },
      email: {
        title: "Email",
        address: "seop.dushanbe@gmail.com"
      },
      hours: {
        title: "Working Hours",
        schedule: "Monday - Friday: 8:00 AM - 5:00 PM",
        weekend: "Saturday - Sunday: Closed"
      },
      form: {
        title: "Have questions?",
        namePlaceholder: "Your name",
        phonePlaceholder: "Your phone",
        emailPlaceholder: "Email address",
        messagePlaceholder: "Your message",
        submitButton: "Send",
        sending: "Sending...",
        successMessage: "Your message has been sent successfully!",
        errorMessage: "An error occurred. Please try again."
      }
    },

    footer: {
      copyright: "© 2025 State Enterprise Prosthetic and Orthopedic Plant of Dushanbe. All rights reserved.",
      ministry: "Ministry of Health and Social Protection of the Republic of Tajikistan",
      address: "734024, Dushanbe, Karategin St. 1",
      phones: ["(+992 37) 225-43-20", "(+992 37) 225-45-15"],
      email: "seop.dushanbe@gmail.com"
    },

    common: {
      learnMore: "Learn More",
      viewAll: "View All",
      established: "Established",
      director: "Director",
      address: "Address",
      phone: "Phone",
      email: "Email",
      note: "Note",
      back: "Back"
    }
  }
};

export type Translations = typeof translations.tj;
