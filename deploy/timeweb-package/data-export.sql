-- =====================================================
-- ЭКСПОРТ ДАННЫХ ДЛЯ TIMEWEB VPS
-- Заводи протезию ортопедӣ
-- Дата экспорта: 2024-12-05
-- =====================================================

-- Сначала создайте таблицы командой: npm run db:push
-- Затем выполните этот SQL файл для импорта данных

-- =====================================================
-- БАННЕРЫ (3 записи)
-- =====================================================
INSERT INTO banners (id, title_tj, title_ru, title_en, subtitle_tj, subtitle_ru, subtitle_en, image_url, image_fit, image_position, crop_x, crop_y, crop_zoom, button_text_tj, button_text_ru, button_text_en, button_link, sort_order, is_active, created_at, updated_at)
VALUES 
  (
    gen_random_uuid(),
    'Барқарорсозии ҳаракат – Таъмини ҳаёти шоиста',
    'Восстановление движения – Обеспечение достойной жизни',
    'Restoring Movement – Ensuring a Dignified Life',
    'Истеҳсоли протезҳо, воситаҳои ортопедӣ ва тавонбахшии маъюбон дар сатҳи давлатӣ',
    'Производство протезов, ортопедических изделий и реабилитация инвалидов на государственном уровне',
    'Manufacturing prosthetics, orthopedic devices and rehabilitation of people with disabilities at the state level',
    '/uploads/banner1.jpg',
    'cover',
    'center',
    0, 0, 1,
    'Маълумоти бештар',
    'Подробнее',
    'Learn More',
    '/patients',
    0,
    true,
    NOW(),
    NOW()
  ),
  (
    gen_random_uuid(),
    'Технологияҳои муосир дар хизмати шумо',
    'Современные технологии на службе вашего здоровья',
    'Modern Technologies at Your Service',
    'Истифодаи усулҳои навтарин барои истеҳсоли протезҳо ва воситаҳои ортопедӣ',
    'Использование новейших методов производства протезов и ортопедических изделий',
    'Using the latest methods for manufacturing prosthetics and orthopedic devices',
    '/uploads/banner2.jpg',
    'cover',
    'center',
    0, 0, 1,
    'Хизматҳои мо',
    'Наши услуги',
    'Our Services',
    '/products',
    1,
    true,
    NOW(),
    NOW()
  ),
  (
    gen_random_uuid(),
    'Дастгирии давлатӣ барои ҳар як беморон',
    'Государственная поддержка для каждого пациента',
    'Government Support for Every Patient',
    'Хизматрасонии ройгон ба маъюбон тибқи қонунгузории Ҷумҳурии Тоҷикистон',
    'Бесплатное обслуживание инвалидов согласно законодательству Республики Таджикистан',
    'Free services for people with disabilities according to the legislation of the Republic of Tajikistan',
    '/uploads/banner3.jpg',
    'cover',
    'center',
    0, 0, 1,
    'Тамос бо мо',
    'Связаться с нами',
    'Contact Us',
    '/contacts',
    2,
    true,
    NOW(),
    NOW()
  );

-- =====================================================
-- НОВОСТИ (5 записей)
-- =====================================================
INSERT INTO news (id, title_tj, title_ru, title_en, content_tj, content_ru, content_en, excerpt_tj, excerpt_ru, excerpt_en, image_url, image_fit, image_position, crop_x, crop_y, crop_zoom, is_active, published_at, created_at, updated_at)
VALUES 
  (
    gen_random_uuid(),
    'Рӯзи байналмилалии маъюбон дар корхона қайд карда шуд',
    'Международный день инвалидов отмечен на предприятии',
    'International Day of Persons with Disabilities celebrated at the facility',
    'Дар рӯзи 3-юми декабр дар Заводи протезию ортопедӣ чорабинии тантанавӣ ба ифтихори Рӯзи байналмилалии маъюбон баргузор гардид. Дар ин чорабинӣ роҳбарони вазоратҳо, намояндагони ҷамоатҳои маъюбон ва кормандони корхона иштирок доштанд. Директори завод дар бораи дастовардҳои соли ҷорӣ ва нақшаҳои минбаъда маълумот дод.',
    '3 декабря на Заводе протезно-ортопедических изделий состоялось торжественное мероприятие, посвященное Международному дню инвалидов. В мероприятии приняли участие руководители министерств, представители организаций инвалидов и сотрудники предприятия. Директор завода рассказал о достижениях текущего года и планах на будущее.',
    'On December 3rd, the Prosthetic and Orthopedic Plant held a ceremonial event in honor of the International Day of Persons with Disabilities. The event was attended by ministry officials, representatives of disability organizations, and plant employees. The plant director spoke about the achievements of the current year and future plans.',
    'Чорабинии тантанавӣ ба ифтихори Рӯзи байналмилалии маъюбон баргузор гардид',
    'Торжественное мероприятие в честь Международного дня инвалидов',
    'Ceremonial event in honor of the International Day of Persons with Disabilities',
    '/uploads/news_disability_day.jpg',
    'cover',
    'center',
    0, 0, 1,
    true,
    '2024-12-03 00:00:00',
    NOW(),
    NOW()
  ),
  (
    gen_random_uuid(),
    'Таҷҳизоти нави итолиёвӣ ба кор даромад',
    'Введено в эксплуатацию новое итальянское оборудование',
    'New Italian equipment put into operation',
    'Заводи протезию ортопедӣ таҷҳизоти навтарини итолиёвиро барои истеҳсоли протезҳои сифатнок ба кор даровард. Ин таҷҳизот имконият медиҳад, ки протезҳои индивидуалии замонавӣ тайёр карда шаванд. Сармоягузорӣ бо дастгирии Ҳукумати Ҷумҳурии Тоҷикистон анҷом дода шуд.',
    'Завод протезно-ортопедических изделий ввел в эксплуатацию новейшее итальянское оборудование для производства качественных протезов. Это оборудование позволяет изготавливать современные индивидуальные протезы. Инвестиции осуществлены при поддержке Правительства Республики Таджикистан.',
    'The Prosthetic and Orthopedic Plant has put into operation the latest Italian equipment for manufacturing quality prosthetics. This equipment allows for the production of modern individual prosthetics. The investment was made with the support of the Government of the Republic of Tajikistan.',
    'Таҷҳизоти навтарини итолиёвӣ барои истеҳсоли протезҳо',
    'Новейшее итальянское оборудование для производства протезов',
    'Latest Italian equipment for prosthetics production',
    '/uploads/news_equipment.jpg',
    'cover',
    'center',
    0, 0, 1,
    true,
    '2024-11-15 00:00:00',
    NOW(),
    NOW()
  ),
  (
    gen_random_uuid(),
    'Семинари омӯзишӣ барои мутахассисон баргузор шуд',
    'Проведен обучающий семинар для специалистов',
    'Training seminar held for specialists',
    'Дар Заводи протезию ортопедӣ семинари омӯзишӣ барои мутахассисони соҳаи тавонбахшӣ баргузор гардид. Дар семинар мутахассисони Олмон ва Русия ширкат варзиданд ва таҷрибаи худро мубодила карданд. Иштирокчиён бо усулҳои навтарини тавонбахшии маъюбон шинос шуданд.',
    'На Заводе протезно-ортопедических изделий состоялся обучающий семинар для специалистов в области реабилитации. В семинаре приняли участие специалисты из Германии и России, которые поделились своим опытом. Участники ознакомились с новейшими методами реабилитации инвалидов.',
    'A training seminar for rehabilitation specialists was held at the Prosthetic and Orthopedic Plant. Specialists from Germany and Russia participated in the seminar and shared their experience. Participants learned about the latest methods of rehabilitation for people with disabilities.',
    'Семинар барои мутахассисони соҳаи тавонбахшӣ',
    'Семинар для специалистов в области реабилитации',
    'Seminar for rehabilitation specialists',
    '/uploads/news_seminar.jpg',
    'cover',
    'center',
    0, 0, 1,
    true,
    '2024-10-20 00:00:00',
    NOW(),
    NOW()
  ),
  (
    gen_random_uuid(),
    'Филиали нав дар Хуҷанд кушода шуд',
    'Открыт новый филиал в Худжанде',
    'New branch opened in Khujand',
    'Дар шаҳри Хуҷанд филиали нави Заводи протезию ортопедӣ кушода шуд. Ин филиал ба сокинони вилояти Суғд имконият медиҳад, ки бе рафтан ба Душанбе протезҳо ва воситаҳои ортопедӣ гиранд. Дар маросими кушоиш раиси вилоят иштирок дошт.',
    'В городе Худжанде открыт новый филиал Завода протезно-ортопедических изделий. Этот филиал позволит жителям Согдийской области получать протезы и ортопедические изделия без поездки в Душанбе. В церемонии открытия принял участие председатель области.',
    'A new branch of the Prosthetic and Orthopedic Plant has been opened in Khujand. This branch will allow residents of Sughd region to receive prosthetics and orthopedic devices without traveling to Dushanbe. The regional chairman attended the opening ceremony.',
    'Филиали нав барои сокинони вилояти Суғд',
    'Новый филиал для жителей Согдийской области',
    'New branch for residents of Sughd region',
    '/uploads/news_khujand.jpg',
    'cover',
    'center',
    0, 0, 1,
    true,
    '2024-09-10 00:00:00',
    NOW(),
    NOW()
  ),
  (
    gen_random_uuid(),
    'Ҳамкорӣ бо Созмони Умумиҷаҳонии Тандурустӣ',
    'Сотрудничество с Всемирной организацией здравоохранения',
    'Cooperation with the World Health Organization',
    'Заводи протезию ортопедӣ бо Созмони Умумиҷаҳонии Тандурустӣ созишнома имзо кард. Тибқи ин созишнома, СУТ дастгирии техникӣ ва машваратии корхонаро анҷом медиҳад. Ҳамчунин, барои омӯзиши мутахассисон дар хориҷа грантҳо ҷудо карда мешаванд.',
    'Завод протезно-ортопедических изделий подписал соглашение со Всемирной организацией здравоохранения. Согласно этому соглашению, ВОЗ будет оказывать техническую и консультативную поддержку предприятию. Также будут выделены гранты на обучение специалистов за рубежом.',
    'The Prosthetic and Orthopedic Plant has signed an agreement with the World Health Organization. According to this agreement, WHO will provide technical and advisory support to the facility. Grants will also be allocated for training specialists abroad.',
    'Созишнома бо СУТ барои дастгирии техникӣ',
    'Соглашение с ВОЗ о технической поддержке',
    'Agreement with WHO for technical support',
    '/uploads/news_who.jpg',
    'cover',
    'center',
    0, 0, 1,
    true,
    '2024-08-05 00:00:00',
    NOW(),
    NOW()
  );

-- =====================================================
-- ПРОДУКТЫ/УСЛУГИ (4 записи)
-- =====================================================
INSERT INTO products (id, name_tj, name_ru, name_en, description_tj, description_ru, description_en, category, image_url, sort_order, is_active, created_at, updated_at)
VALUES 
  (
    gen_random_uuid(),
    'Протезҳо',
    'Протезы',
    'Prosthetics',
    'Истеҳсоли протезҳои андомҳои болоӣ ва поёнӣ бо технологияи муосир ва материалҳои сифатнок',
    'Производство протезов верхних и нижних конечностей с использованием современных технологий и качественных материалов',
    'Manufacturing upper and lower limb prosthetics using modern technology and quality materials',
    'services',
    NULL,
    0,
    true,
    NOW(),
    NOW()
  ),
  (
    gen_random_uuid(),
    'Ортопедия',
    'Ортопедия',
    'Orthopedics',
    'Пойафзолҳои ортопедӣ барои калонсолон ва кӯдакон, зерпоякҳои ортопедӣ ва дигар маҳсулот',
    'Ортопедическая обувь для взрослых и детей, ортопедические стельки и другие изделия',
    'Orthopedic footwear for adults and children, orthopedic insoles and other products',
    'services',
    NULL,
    1,
    true,
    NOW(),
    NOW()
  ),
  (
    gen_random_uuid(),
    'Воситаҳои ёрирасон',
    'Вспомогательные средства',
    'Assistive Devices',
    'Бандҳо, корсетҳо, асоҳо, аробачаҳои ҳаракатӣ ва дигар воситаҳои зарурӣ',
    'Бандажи, корсеты, трости, инвалидные коляски и другие необходимые средства',
    'Bandages, corsets, canes, wheelchairs and other necessary devices',
    'services',
    NULL,
    2,
    true,
    NOW(),
    NOW()
  ),
  (
    gen_random_uuid(),
    'Статсионар',
    'Стационар',
    'Inpatient Care',
    'Тавонбахшии беморонро дар шароити стационарӣ бо таъмини ҷой ва хӯрок',
    'Реабилитация пациентов в стационарных условиях с предоставлением проживания и питания',
    'Patient rehabilitation in inpatient conditions with accommodation and meals provided',
    'services',
    NULL,
    3,
    true,
    NOW(),
    NOW()
  );

-- =====================================================
-- ФИЛИАЛЫ (4 записи)
-- =====================================================
INSERT INTO branches (id, name_tj, name_ru, name_en, city_tj, city_ru, city_en, description_tj, description_ru, description_en, address_tj, address_ru, address_en, phone, email, latitude, longitude, map_url, sort_order, is_active, created_at, updated_at)
VALUES 
  (
    gen_random_uuid(),
    'Марказ',
    'Центральный офис',
    'Headquarters',
    'ш. Душанбе',
    'г. Душанбе',
    'Dushanbe',
    'Марказии асосӣ',
    'Главный офис',
    'Main office',
    NULL, NULL, NULL, NULL, NULL,
    '38.5598',
    '68.7738',
    'https://www.google.com/maps?q=38.5598,68.7738&hl=en&z=14&output=embed',
    0,
    true,
    NOW(),
    NOW()
  ),
  (
    gen_random_uuid(),
    'Филиал',
    'Филиал',
    'Branch',
    'ш. Хуҷанд',
    'г. Худжанд',
    'Khujand',
    'Минтақаи шимол',
    'Северный регион',
    'Northern region',
    NULL, NULL, NULL, NULL, NULL,
    '40.2828',
    '69.6219',
    'https://www.google.com/maps?q=40.2828,69.6219&hl=en&z=14&output=embed',
    1,
    true,
    NOW(),
    NOW()
  ),
  (
    gen_random_uuid(),
    'Филиал',
    'Филиал',
    'Branch',
    'ш. Кӯлоб',
    'г. Куляб',
    'Kulob',
    'Минтақаи ҷануб',
    'Южный регион',
    'Southern region',
    NULL, NULL, NULL, NULL, NULL,
    '37.9100',
    '69.7850',
    'https://www.google.com/maps?q=37.9100,69.7850&hl=en&z=14&output=embed',
    2,
    true,
    NOW(),
    NOW()
  ),
  (
    gen_random_uuid(),
    'Филиал',
    'Филиал',
    'Branch',
    'ш. Хоруғ',
    'г. Хорог',
    'Khorog',
    'Вилояти Кӯҳистони Бадахшон',
    'Горно-Бадахшанская автономная область',
    'Gorno-Badakhshan Autonomous Region',
    NULL, NULL, NULL, NULL, NULL,
    '37.4894',
    '71.5537',
    'https://www.google.com/maps?q=37.4894,71.5537&hl=en&z=14&output=embed',
    3,
    true,
    NOW(),
    NOW()
  );

-- =====================================================
-- АДМИНИСТРАТОР (пароль по умолчанию: admin123)
-- Не забудьте сменить пароль после первого входа!
-- =====================================================
-- Хеш для пароля admin123 создается при запуске seed-admin.ts
-- Запустите: npx tsx server/seed-admin.ts
