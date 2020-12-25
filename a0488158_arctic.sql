-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Дек 25 2020 г., 11:05
-- Версия сервера: 5.6.47
-- Версия PHP: 7.1.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `a0488158_arctic`
--

-- --------------------------------------------------------

--
-- Структура таблицы `locales`
--

CREATE TABLE `locales` (
  `id` int(11) NOT NULL,
  `loc_id` int(11) NOT NULL,
  `name` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(1000) COLLATE utf8mb4_unicode_ci NOT NULL,
  `price` int(11) NOT NULL DEFAULT '0',
  `complexity` varchar(1) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '1',
  `summer` tinyint(1) NOT NULL,
  `autumn` tinyint(1) NOT NULL,
  `winter` tinyint(1) NOT NULL,
  `spring` tinyint(1) NOT NULL,
  `helicopter` tinyint(1) NOT NULL,
  `cruise` tinyint(1) NOT NULL,
  `hiking` tinyint(1) NOT NULL,
  `other` tinyint(1) NOT NULL,
  `territory` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `preview_text` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `coords_x` float NOT NULL,
  `coords_y` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `locales`
--

INSERT INTO `locales` (`id`, `loc_id`, `name`, `image`, `price`, `complexity`, `summer`, `autumn`, `winter`, `spring`, `helicopter`, `cruise`, `hiking`, `other`, `territory`, `preview_text`, `coords_x`, `coords_y`) VALUES
(1, 1, 'Озеро Хантайское', 'tours/1.jpg', 10000, '1', 0, 0, 1, 1, 0, 0, 1, 0, 'Озеро Хантайское', 'Ночевка и трофейная рыбалка на одном из красивейших озер Зауралья', 69.3411, 88.1747),
(2, 2, 'Плато Путорана', 'tours/2.jpg', 5000, '2', 1, 1, 1, 1, 1, 0, 1, 0, 'Плато Путорана', 'Lorem ipsum dolor sit amet consectetur adipisicing elit.', 69.3984, 88.1546),
(3, 3, 'Город Дудинка', 'tours/3.jpg', 8500, '1', 0, 0, 0, 1, 0, 0, 0, 1, 'Город Дудинка', 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nobis quidem ipsam quisquam?', 69.3541, 88.1747),
(4, 4, 'Озеро Лама', 'tours/1.jpg', 12300, '2', 1, 0, 1, 0, 0, 1, 0, 0, 'Озеро Лама', 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nobis quidem ipsam quisquam?', 69.3841, 88.1713),
(5, 5, 'Пос. Снежногорск', 'tours/2.jpg', 0, '1', 1, 1, 1, 1, 0, 0, 1, 0, 'Пос. Снежногорск', 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nobis quidem ipsam quisquam?', 69.3957, 88.1722),
(6, 6, 'Красные Камни', 'tours/3.jpg', 19000, '3', 1, 0, 0, 0, 1, 0, 1, 0, 'Красные Камни', 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nobis quidem ipsam quisquam?', 69.3957, 89.1718);

-- --------------------------------------------------------

--
-- Структура таблицы `locales_description`
--

CREATE TABLE `locales_description` (
  `id` int(11) NOT NULL,
  `loc_id` int(11) NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `intro` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `facts` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `territory` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `transport` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `lodging` text COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `locales_description`
--

INSERT INTO `locales_description` (`id`, `loc_id`, `title`, `intro`, `image`, `description`, `facts`, `territory`, `transport`, `lodging`) VALUES
(1, 1, 'Поселок озеро Хантайское. Национальный колорит в Таймырской глуши', 'Небольшой национальный посёлок Хантайское озеро лежит чуть западнее устья реки Хаканча. А с запада посёлок ограничивает глубоко вдающийся в берег залив. Таким образом, посёлок расположен на полуострове. Здесь живут, в основном, долгане и эвенки. Жителей около полутысячи.', 'img/locales/locale-1/1.jpg', 'ИСТОРИЯ ПОСЕЛКА\r\nИзначально посёлок формировался как стойбище коренного населения без постоянных построек. Основу нынешнего населённого пункта построили в 1952—1959 гг. ссыльные из немецких поселений на Волге, из Польши и Прибалтики. Таким образом, архитектура посёлка формировалась различными этапами его развития. Ближе к берегу стоят здание старой школы и два ряда деревянных домов, построенных депортированными. Третий ряд домов был построен в конце 1960-х годов в период преобразования колхоза и совхоза: новая школа, здания администрации ГОУСП «Хантайский» и посёлка, четырёхквартирные дома. В 1970-е годы после принудительного переселения в 1969 году 48 долганских и говорящих по-якутски эвенкийских семей, была построена следующая группа домов в стороне от озера. В 1976 г. Указом Президиума ВС РСФСР поселок Таймыр переименован в Хантайское Озеро.\r\n\r\nЭКОНОМИКА И ИНФРАСТРУКТУРА\r\nПосёлок расположен на полуострове в юго-западной части Хантайского озера. На берегу имеется небольшой порт (пирс). В посёлке работают школа-интернат, детский сад, участковая больница, магазин, пекарня, отделение «Федеральной почтовой связи», отделение ОАО «Электросвязь», сельский Дом культуры, библиотека, ДЭС, ГОУСП «Хантайское», семейно-родовые хозяйства, община МНС «Буркан». Большинство жителей посёлка Хантайское Озеро заняты в традиционных отраслях хозяйствования коренных народов Севера.\r\n\r\nПоселок интересен в плане изучения традиций коренных народов Таймыра, из-за удаленности от цивилизации почти не изменившихся с древних времен. Туристы смогут стать участниками нескольких уникальных местных промыслов и обрядов:', 'Эвенки отмечают Новый год в середине лета. А еще они задабривают дух огня, вместо того чтобы положить подарки под ёлочку. Во время шаманского ритуала Кормления огня в поселке озеро Хантайское у вас будет шанс в этом убедиться!;\r\nТрофейная рыбалка. Реки в окрестностях поселка озеро Хантайское очень богатым животным миром. В них представлен практически весь видовой состав рыб. Это и таймень, и ленок, и хариус, и сиг, и др. Вы сможете поймать тайменя весом до 20 кг\r\n', 'Поселок озеро Хантайское', 'Вертолет; Судно на воздушной подушке', 'Палатка; Ночлег у местных жителей');

-- --------------------------------------------------------

--
-- Структура таблицы `points`
--

CREATE TABLE `points` (
  `id` int(11) NOT NULL,
  `tour_id` int(11) NOT NULL DEFAULT '1',
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `image` text COLLATE utf8_unicode_ci NOT NULL,
  `text` text COLLATE utf8_unicode_ci NOT NULL,
  `coords_x` float NOT NULL,
  `coords_y` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Дамп данных таблицы `points`
--

INSERT INTO `points` (`id`, `tour_id`, `name`, `image`, `text`, `coords_x`, `coords_y`) VALUES
(1, 1, 'Озеро Хантайское', 'tours/1.jpg', 'Ночевка и трофейная рыбалка на одном из красивейших озер Зауралья', 69.3411, 88.1747),
(2, 1, 'Город Дудинка', 'tours/2.jpg', 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nobis quidem ipsam quisquam?', 69.3541, 88.1747),
(3, 1, 'Плато Путорана', 'tours/3.jpg', 'Lorem ipsum dolor sit amet consectetur adipisicing elit.', 69.3984, 88.1546),
(4, 2, 'Озеро Лама', 'tours/1.jpg', 'Lorem ipsum dolor sit', 69.3481, 88.1753),
(5, 2, 'Пос. Снежногорск', 'tours/2.jpg', 'Поселок Снежногорск славится своими...рыбий текст рыбий текст рыбий текст', 69.3567, 88.1547),
(6, 2, 'Красные камни', 'tours/3.jpg', 'Красные камни...рыбий текст рыбий текст рыбий текст', 69.3841, 88.1524);

-- --------------------------------------------------------

--
-- Структура таблицы `routes`
--

CREATE TABLE `routes` (
  `id` int(11) NOT NULL,
  `name` text COLLATE utf8_unicode_ci NOT NULL,
  `image` text COLLATE utf8_unicode_ci NOT NULL,
  `tour_id` varchar(11) COLLATE utf8_unicode_ci DEFAULT NULL,
  `price` int(11) NOT NULL DEFAULT '0',
  `complexity` varchar(3) COLLATE utf8_unicode_ci NOT NULL DEFAULT '1',
  `summer` tinyint(1) DEFAULT NULL,
  `autumn` tinyint(1) DEFAULT NULL,
  `winter` tinyint(1) DEFAULT NULL,
  `spring` tinyint(1) DEFAULT NULL,
  `territory` text COLLATE utf8_unicode_ci NOT NULL,
  `helicopter` tinyint(1) DEFAULT NULL,
  `cruise` tinyint(1) DEFAULT NULL,
  `hiking` tinyint(1) DEFAULT NULL,
  `other` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Дамп данных таблицы `routes`
--

INSERT INTO `routes` (`id`, `name`, `image`, `tour_id`, `price`, `complexity`, `summer`, `autumn`, `winter`, `spring`, `territory`, `helicopter`, `cruise`, `hiking`, `other`) VALUES
(1, 'Горы без вершин. Путешествие на плато Путорана', 'tours/1.jpg', '1', 600000, '3', 1, 1, 1, 0, 'Плато Путорана', 1, 0, 1, 0),
(2, 'В сердце России. Сплав по Микчангде и восхождение на плато Путорана', 'tours/2.jpg', '2', 250000, '2', 1, 1, 0, 1, 'Плато Путорана', 0, 1, 1, 0),
(3, 'Енисейская экспедиция. Круиз из Красноярска в Дудинку', 'tours/3.jpg', '3', 170000, '1', 1, 1, 1, 1, 'Город Дудинка', 0, 1, 1, 0);

-- --------------------------------------------------------

--
-- Структура таблицы `routes_description`
--

CREATE TABLE `routes_description` (
  `id` int(11) NOT NULL,
  `tour_id` int(11) NOT NULL DEFAULT '1',
  `title` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `intro` text COLLATE utf8_unicode_ci NOT NULL,
  `image_1` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `description` text COLLATE utf8_unicode_ci NOT NULL,
  `actions` text COLLATE utf8_unicode_ci NOT NULL,
  `program_intro` text COLLATE utf8_unicode_ci NOT NULL,
  `residence` text COLLATE utf8_unicode_ci NOT NULL,
  `image_2` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `territory` text COLLATE utf8_unicode_ci NOT NULL,
  `subtitle` text COLLATE utf8_unicode_ci NOT NULL,
  `tent` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `hotel` varchar(100) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Дамп данных таблицы `routes_description`
--

INSERT INTO `routes_description` (`id`, `tour_id`, `title`, `intro`, `image_1`, `description`, `actions`, `program_intro`, `residence`, `image_2`, `territory`, `subtitle`, `tent`, `hotel`) VALUES
(1, 1, 'В сердце России. Сплав по Микчангде и восхождение на плато Путорана', 'Природа на плато Путорана уникальна: горы без вершин, глубочайшие каньоны, живописные фьорды и настоящие лабиринты из сотен рек, озер и водопадов. А еще здесь находится георгафический центр России.', 'img/tours/tour-1/1.jpg', 'Первые 4 дня путешествия вы будете сплавляться на рафтах по горной реке Микчангда, протекающей по центру плато Путорана. Добравшись до озера Лама, вы отдохнете в кемпинге, совершая пешие прогулки к водопадам и на вершину плато. А вот 4 главных причины, чтобы отправиться в это путешествие:', 'В стоимость программы включена вертолетная заброска к месту начала маршрута — во время полета вам откроется незабываемая панорама бескрайнего плато с глубочайшими каньонами и высокими водопадами;\r\nВо время сплава по Микчангде вас ждут красивейшие пейзажи Путоранского заповедника: окружающие долину реки, и горы, — одни из самых высоких на плато (1200-1300 м);\r\nУ вас будет возможность устроить трофейную рыбалку на хариуса и тайменя. Дополнительный текст до наполнения в три строки. Tum altĕrum calceum lenĭter cautēque in pavimentum posuit et in somnum lapsus est;\r\nА также попробовать национальную кухню народов крайнего Севера и узнаете секреты приготовления традиционного блюда — сугудай. Дополнительный текст до наполнения в три строки', 'Путешествие начинается в Норильске, куда вам нужно добраться самостоятельно. Рекомендуем утренний рейс с прилетом в Норильск до 07:00. Для возвращения в Москву также выбирайте утренние рейсы с вылетом из Норильска до 08:00.', 'С пятого по седьмой дни тура вы будете жить в кемпинге на берегу озера Лама. Разместитесь в двухместных палатках (два спальных отсека, разделенных просторным тамбуром). В каждой палатке – двуспальные туристические кровати с матрасами, спальники с температурой комфорта -10°С, постельное белье (простыни, подушки, одеяла). Тамбур оборудован светильником и обработан антикомариным средством. На территории кемпинга есть столовая на 12 человек, две душевые кабины (палаточные), стационарные туалеты, походная баня (с температурой нагрева 110°С) и костровая поляна. Заключительную ночь путешествия вы проведете в двухместном номере отеля «Норильск» 3*, расположенном в центре города. В вашем номере будет удобная мебель, ванная или душевая, телевизор, интернет. К услугам гостей на территории – сауна, бильярд, спортивный зал.', 'img/tours/tour-1/2.jpg', 'Плато Путорана', 'В сердце России', '5 ночей', '1 ночь');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `locales`
--
ALTER TABLE `locales`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `points`
--
ALTER TABLE `points`
  ADD UNIQUE KEY `id` (`id`);

--
-- Индексы таблицы `routes`
--
ALTER TABLE `routes`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `routes_description`
--
ALTER TABLE `routes_description`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `locales`
--
ALTER TABLE `locales`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT для таблицы `points`
--
ALTER TABLE `points`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT для таблицы `routes`
--
ALTER TABLE `routes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT для таблицы `routes_description`
--
ALTER TABLE `routes_description`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
