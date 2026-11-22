export interface VisualOption {
  position: number;
  shapeKey: string;
  labelAr: string;
  labelEn: string;
}

export interface VisualItem {
  key: string;
  itemNumber: number | null;
  group: 'training' | 1 | 2 | 3;
  ageRangeAr: string;
  ageRangeEn: string;
  correctPosition: number;
  acceptedPositions?: number[];
  examinerCueAr: string;
  options: VisualOption[];
}

export interface VerbalItem {
  key: string;
  itemNumber: number | null;
  group: 'training' | 1 | 2 | 3;
  ageRangeAr: string;
  ageRangeEn: string;
  promptAr: string;
  promptEn: string;
  acceptedAnswers: string[];
  examinerCueAr: string;
}

export const VISUAL_TRAINING_ITEMS: VisualItem[] = [
  {
    key: 'train_v_a',
    itemNumber: null,
    group: 'training',
    ageRangeAr: 'مثال تدريبي (أ)',
    ageRangeEn: 'Training Example (A)',
    correctPosition: 2,
    examinerCueAr:
      'مثلاً في البطاقة دي فيه ثلاث صور: آدي صورة، وآدي صورة، وآدي صورة... فيه واحدة بس من الصور دي تختلف عن الباقي اللي معاها أو مهيش زيها. بص للصور كلها وشاور بصباعك على الصورة المختلفة.',
    options: [
      { position: 1, shapeKey: 'square', labelAr: 'مربع', labelEn: 'Square' },
      { position: 2, shapeKey: 'circle', labelAr: 'دائرة (مختلفة)', labelEn: 'Circle' },
      { position: 3, shapeKey: 'square', labelAr: 'مربع', labelEn: 'Square' },
    ],
  },
  {
    key: 'train_v_b',
    itemNumber: null,
    group: 'training',
    ageRangeAr: 'مثال تدريبي (ب)',
    ageRangeEn: 'Training Example (B)',
    correctPosition: 3,
    examinerCueAr:
      'بص للصور كلها وشاور على الصورة المختلفة أو اللي مهيش زي الباقي اللي معاها (أمثلة تدريبية لا تحسب درجاتها).',
    options: [
      { position: 1, shapeKey: 'elephant', labelAr: 'فيل', labelEn: 'Elephant' },
      { position: 2, shapeKey: 'elephant', labelAr: 'فيل', labelEn: 'Elephant' },
      { position: 3, shapeKey: 'man_face_old', labelAr: 'وجه رجل (مختلف)', labelEn: 'Man Face' },
    ],
  },
  {
    key: 'train_v_c',
    itemNumber: null,
    group: 'training',
    ageRangeAr: 'مثال تدريبي (ج)',
    ageRangeEn: 'Training Example (C)',
    correctPosition: 1,
    examinerCueAr:
      'بص للصور كلها وشاور بصباعك على الصورة المختلفة عن الشجرتين.',
    options: [
      { position: 1, shapeKey: 'sunburst', labelAr: 'شمس/نجمة (مختلفة)', labelEn: 'Sunburst' },
      { position: 2, shapeKey: 'tree', labelAr: 'شجرة', labelEn: 'Tree' },
      { position: 3, shapeKey: 'tree', labelAr: 'شجرة', labelEn: 'Tree' },
    ],
  },
];

export const VISUAL_ITEMS: VisualItem[] = [
  // Group 1 (1 - 15) — Ages 3-5 — 3 options per card
  {
    key: 'v_1',
    itemNumber: 1,
    group: 1,
    ageRangeAr: 'المجموعة الأولى (٣ - ٥ سنوات)',
    ageRangeEn: 'Group 1 (Ages 3-5)',
    correctPosition: 2,
    examinerCueAr: 'بص للصور كلها وشاور على الصورة المختلفة اللي مفيش زيها.',
    options: [
      { position: 1, shapeKey: 'square', labelAr: 'مربع', labelEn: 'Square' },
      { position: 2, shapeKey: 'diamond', labelAr: 'معين', labelEn: 'Diamond' },
      { position: 3, shapeKey: 'square', labelAr: 'مربع', labelEn: 'Square' },
    ],
  },
  {
    key: 'v_2',
    itemNumber: 2,
    group: 1,
    ageRangeAr: 'المجموعة الأولى (٣ - ٥ سنوات)',
    ageRangeEn: 'Group 1 (Ages 3-5)',
    correctPosition: 1,
    examinerCueAr: 'بص للصور كلها وشاور على الصورة المختلفة اللي مفيش زيها.',
    options: [
      { position: 1, shapeKey: 'puppet_clown', labelAr: 'دمية', labelEn: 'Puppet' },
      { position: 2, shapeKey: 'girl_face_dots', labelAr: 'وجه بنت', labelEn: 'Girl Face' },
      { position: 3, shapeKey: 'girl_face_plain', labelAr: 'وجه بنت', labelEn: 'Girl Face' },
    ],
  },
  {
    key: 'v_3',
    itemNumber: 3,
    group: 1,
    ageRangeAr: 'المجموعة الأولى (٣ - ٥ سنوات)',
    ageRangeEn: 'Group 1 (Ages 3-5)',
    correctPosition: 2,
    examinerCueAr: 'بص للصور كلها وشاور على الصورة المختلفة اللي مفيش زيها.',
    options: [
      { position: 1, shapeKey: 'spoon', labelAr: 'ملعقة', labelEn: 'Spoon' },
      { position: 2, shapeKey: 'fork', labelAr: 'شوكة', labelEn: 'Fork' },
      { position: 3, shapeKey: 'spoon', labelAr: 'ملعقة', labelEn: 'Spoon' },
    ],
  },
  {
    key: 'v_4',
    itemNumber: 4,
    group: 1,
    ageRangeAr: 'المجموعة الأولى (٣ - ٥ سنوات)',
    ageRangeEn: 'Group 1 (Ages 3-5)',
    correctPosition: 1,
    examinerCueAr: 'بص للصور كلها وشاور على الصورة المختلفة اللي مفيش زيها.',
    options: [
      { position: 1, shapeKey: 'alarm_clock', labelAr: 'منبه', labelEn: 'Alarm Clock' },
      { position: 2, shapeKey: 'wristwatch', labelAr: 'ساعة يد', labelEn: 'Wristwatch' },
      { position: 3, shapeKey: 'wristwatch', labelAr: 'ساعة يد', labelEn: 'Wristwatch' },
    ],
  },
  {
    key: 'v_5',
    itemNumber: 5,
    group: 1,
    ageRangeAr: 'المجموعة الأولى (٣ - ٥ سنوات)',
    ageRangeEn: 'Group 1 (Ages 3-5)',
    correctPosition: 1,
    examinerCueAr: 'بص للصور كلها وشاور على الصورة المختلفة اللي مفيش زيها.',
    options: [
      { position: 1, shapeKey: 'rooster', labelAr: 'ديك', labelEn: 'Rooster' },
      { position: 2, shapeKey: 'hen', labelAr: 'دجاجة', labelEn: 'Hen' },
      { position: 3, shapeKey: 'hen', labelAr: 'دجاجة', labelEn: 'Hen' },
    ],
  },
  {
    key: 'v_6',
    itemNumber: 6,
    group: 1,
    ageRangeAr: 'المجموعة الأولى (٣ - ٥ سنوات)',
    ageRangeEn: 'Group 1 (Ages 3-5)',
    correctPosition: 2,
    examinerCueAr: 'بص للصور كلها وشاور على الصورة المختلفة اللي مفيش زيها.',
    options: [
      { position: 1, shapeKey: 'cat_bowtie', labelAr: 'قطة بفيونكة', labelEn: 'Cat with Bowtie' },
      { position: 2, shapeKey: 'teddy_bear', labelAr: 'دب', labelEn: 'Teddy Bear' },
      { position: 3, shapeKey: 'cat_bowtie', labelAr: 'قطة بفيونكة', labelEn: 'Cat with Bowtie' },
    ],
  },
  {
    key: 'v_7',
    itemNumber: 7,
    group: 1,
    ageRangeAr: 'المجموعة الأولى (٣ - ٥ سنوات)',
    ageRangeEn: 'Group 1 (Ages 3-5)',
    correctPosition: 3,
    examinerCueAr: 'بص للصور كلها وشاور على الصورة المختلفة اللي مفيش زيها.',
    options: [
      { position: 1, shapeKey: 'boy_listening', labelAr: 'ولد', labelEn: 'Boy' },
      { position: 2, shapeKey: 'boy_listening', labelAr: 'ولد', labelEn: 'Boy' },
      { position: 3, shapeKey: 'man_face_old', labelAr: 'رجل بنظارة', labelEn: 'Old Man' },
    ],
  },
  {
    key: 'v_8',
    itemNumber: 8,
    group: 1,
    ageRangeAr: 'المجموعة الأولى (٣ - ٥ سنوات)',
    ageRangeEn: 'Group 1 (Ages 3-5)',
    correctPosition: 2,
    examinerCueAr: 'بص للصور كلها وشاور على الصورة المختلفة اللي مفيش زيها.',
    options: [
      { position: 1, shapeKey: 'bird', labelAr: 'عصفور', labelEn: 'Bird' },
      { position: 2, shapeKey: 'turtle', labelAr: 'سلحفاة', labelEn: 'Turtle' },
      { position: 3, shapeKey: 'bird', labelAr: 'عصفور', labelEn: 'Bird' },
    ],
  },
  {
    key: 'v_9',
    itemNumber: 9,
    group: 1,
    ageRangeAr: 'المجموعة الأولى (٣ - ٥ سنوات)',
    ageRangeEn: 'Group 1 (Ages 3-5)',
    correctPosition: 1,
    examinerCueAr: 'بص للصور كلها وشاور على الصورة المختلفة اللي مفيش زيها.',
    options: [
      { position: 1, shapeKey: 'dog_lying', labelAr: 'كلب', labelEn: 'Dog' },
      { position: 2, shapeKey: 'butterfly', labelAr: 'فراشة', labelEn: 'Butterfly' },
      { position: 3, shapeKey: 'butterfly', labelAr: 'فراشة', labelEn: 'Butterfly' },
    ],
  },
  {
    key: 'v_10',
    itemNumber: 10,
    group: 1,
    ageRangeAr: 'المجموعة الأولى (٣ - ٥ سنوات)',
    ageRangeEn: 'Group 1 (Ages 3-5)',
    correctPosition: 3,
    examinerCueAr: 'بص للصور كلها وشاور على الصورة المختلفة اللي مفيش زيها.',
    options: [
      { position: 1, shapeKey: 'fish_long', labelAr: 'سمكة طويلة', labelEn: 'Slender Fish' },
      { position: 2, shapeKey: 'fish_long', labelAr: 'سمكة طويلة', labelEn: 'Slender Fish' },
      { position: 3, shapeKey: 'fish_chubby', labelAr: 'سمكة عريضة', labelEn: 'Broad Fish' },
    ],
  },
  {
    key: 'v_11',
    itemNumber: 11,
    group: 1,
    ageRangeAr: 'المجموعة الأولى (٣ - ٥ سنوات)',
    ageRangeEn: 'Group 1 (Ages 3-5)',
    correctPosition: 1,
    examinerCueAr: 'بص للصور كلها وشاور على الصورة المختلفة اللي مفيش زيها.',
    options: [
      { position: 1, shapeKey: 'sailboat_nomast', labelAr: 'مركب بدون سارية', labelEn: 'Sailboat without Mast' },
      { position: 2, shapeKey: 'sailboat_mast', labelAr: 'مركب بسارية', labelEn: 'Sailboat with Mast' },
      { position: 3, shapeKey: 'sailboat_mast', labelAr: 'مركب بسارية', labelEn: 'Sailboat with Mast' },
    ],
  },
  {
    key: 'v_12',
    itemNumber: 12,
    group: 1,
    ageRangeAr: 'المجموعة الأولى (٣ - ٥ سنوات)',
    ageRangeEn: 'Group 1 (Ages 3-5)',
    correctPosition: 3,
    examinerCueAr: 'بص للصور كلها وشاور على الصورة المختلفة اللي مفيش زيها.',
    options: [
      { position: 1, shapeKey: 'armchair_round', labelAr: 'كرسي بظهر دائري', labelEn: 'Round Armchair' },
      { position: 2, shapeKey: 'armchair_round', labelAr: 'كرسي بظهر دائري', labelEn: 'Round Armchair' },
      { position: 3, shapeKey: 'armchair_square', labelAr: 'كرسي بظهر مربع', labelEn: 'Square Armchair' },
    ],
  },
  {
    key: 'v_13',
    itemNumber: 13,
    group: 1,
    ageRangeAr: 'المجموعة الأولى (٣ - ٥ سنوات)',
    ageRangeEn: 'Group 1 (Ages 3-5)',
    correctPosition: 1,
    examinerCueAr: 'بص للصور كلها وشاور على الصورة المختلفة اللي مفيش زيها.',
    options: [
      { position: 1, shapeKey: 'mickey_small', labelAr: 'فأر صغير متجه لأسفل', labelEn: 'Small Mouse' },
      { position: 2, shapeKey: 'mickey_large', labelAr: 'فأر كبير', labelEn: 'Large Mouse' },
      { position: 3, shapeKey: 'mickey_large', labelAr: 'فأر كبير', labelEn: 'Large Mouse' },
    ],
  },
  {
    key: 'v_14',
    itemNumber: 14,
    group: 1,
    ageRangeAr: 'المجموعة الأولى (٣ - ٥ سنوات)',
    ageRangeEn: 'Group 1 (Ages 3-5)',
    correctPosition: 2,
    examinerCueAr: 'بص للصور كلها وشاور على الصورة المختلفة اللي مفيش زيها.',
    options: [
      { position: 1, shapeKey: 'shirt_bowtie', labelAr: 'قميص بفيونكة', labelEn: 'Shirt with Bowtie' },
      { position: 2, shapeKey: 'shirt_necktie', labelAr: 'قميص بربطة عنق', labelEn: 'Shirt with Necktie' },
      { position: 3, shapeKey: 'shirt_bowtie', labelAr: 'قميص بفيونكة', labelEn: 'Shirt with Bowtie' },
    ],
  },
  {
    key: 'v_15',
    itemNumber: 15,
    group: 1,
    ageRangeAr: 'المجموعة الأولى (٣ - ٥ سنوات)',
    ageRangeEn: 'Group 1 (Ages 3-5)',
    correctPosition: 2,
    examinerCueAr: 'بص للصور كلها وشاور على الصورة المختلفة اللي مفيش زيها.',
    options: [
      { position: 1, shapeKey: 'boy_smiling', labelAr: 'ولد مبتسم', labelEn: 'Smiling Boy' },
      { position: 2, shapeKey: 'boy_frowning', labelAr: 'ولد عابس', labelEn: 'Frowning Boy' },
      { position: 3, shapeKey: 'boy_smiling', labelAr: 'ولد مبتسم', labelEn: 'Smiling Boy' },
    ],
  },

  // Group 2 (16 - 30) — Ages 5-7 — 4 options per card
  {
    key: 'v_16',
    itemNumber: 16,
    group: 2,
    ageRangeAr: 'المجموعة الثانية (٥ - ٧ سنوات)',
    ageRangeEn: 'Group 2 (Ages 5-7)',
    correctPosition: 3,
    examinerCueAr: 'لاحظ أن فيه صور أكثر في البطاقات دي (أربع صور)... بص للصور كلها ووريني الصورة المختلفة اللي مفيش زيها.',
    options: [
      { position: 1, shapeKey: 'umbrella_closed', labelAr: 'شمسية مقفولة', labelEn: 'Closed Umbrella' },
      { position: 2, shapeKey: 'umbrella_closed', labelAr: 'شمسية مقفولة', labelEn: 'Closed Umbrella' },
      { position: 3, shapeKey: 'umbrella_open', labelAr: 'شمسية مفتوحة', labelEn: 'Open Umbrella' },
      { position: 4, shapeKey: 'umbrella_closed', labelAr: 'شمسية مقفولة', labelEn: 'Closed Umbrella' },
    ],
  },
  {
    key: 'v_17',
    itemNumber: 17,
    group: 2,
    ageRangeAr: 'المجموعة الثانية (٥ - ٧ سنوات)',
    ageRangeEn: 'Group 2 (Ages 5-7)',
    correctPosition: 3,
    examinerCueAr: 'بص للصور كلها ووريني الصورة المختلفة اللي مفيش زيها.',
    options: [
      { position: 1, shapeKey: 'flower_simple', labelAr: 'زهرة', labelEn: 'Flower' },
      { position: 2, shapeKey: 'flower_daisy', labelAr: 'زهرة', labelEn: 'Daisy' },
      { position: 3, shapeKey: 'tree', labelAr: 'شجرة', labelEn: 'Tree' },
      { position: 4, shapeKey: 'flower_tulip', labelAr: 'زهرة', labelEn: 'Blossom' },
    ],
  },
  {
    key: 'v_18',
    itemNumber: 18,
    group: 2,
    ageRangeAr: 'المجموعة الثانية (٥ - ٧ سنوات)',
    ageRangeEn: 'Group 2 (Ages 5-7)',
    correctPosition: 2,
    examinerCueAr: 'بص للصور كلها ووريني الصورة المختلفة اللي مفيش زيها.',
    options: [
      { position: 1, shapeKey: 'cat_sitting', labelAr: 'قطة', labelEn: 'Cat' },
      { position: 2, shapeKey: 'sheep', labelAr: 'خروف / ماعز', labelEn: 'Sheep' },
      { position: 3, shapeKey: 'cat_sitting', labelAr: 'قطة', labelEn: 'Cat' },
      { position: 4, shapeKey: 'cat_sitting', labelAr: 'قطة', labelEn: 'Cat' },
    ],
  },
  {
    key: 'v_19',
    itemNumber: 19,
    group: 2,
    ageRangeAr: 'المجموعة الثانية (٥ - ٧ سنوات)',
    ageRangeEn: 'Group 2 (Ages 5-7)',
    correctPosition: 1,
    examinerCueAr: 'بص للصور كلها ووريني الصورة المختلفة اللي مفيش زيها.',
    options: [
      { position: 1, shapeKey: 'clown_hat', labelAr: 'مهرج', labelEn: 'Clown' },
      { position: 2, shapeKey: 'apple', labelAr: 'تفاحة', labelEn: 'Apple' },
      { position: 3, shapeKey: 'tomato', labelAr: 'طماطم/برتقالة', labelEn: 'Tomato' },
      { position: 4, shapeKey: 'pomegranate', labelAr: 'رمانة', labelEn: 'Pomegranate' },
    ],
  },
  {
    key: 'v_20',
    itemNumber: 20,
    group: 2,
    ageRangeAr: 'المجموعة الثانية (٥ - ٧ سنوات)',
    ageRangeEn: 'Group 2 (Ages 5-7)',
    correctPosition: 3,
    examinerCueAr: 'بص للصور كلها ووريني الصورة المختلفة اللي مفيش زيها.',
    options: [
      { position: 1, shapeKey: 'girl_curls', labelAr: 'بنت', labelEn: 'Girl' },
      { position: 2, shapeKey: 'girl_side', labelAr: 'بنت', labelEn: 'Girl' },
      { position: 3, shapeKey: 'boy_cap', labelAr: 'ولد بكاب', labelEn: 'Boy with Cap' },
      { position: 4, shapeKey: 'girl_bob', labelAr: 'بنت', labelEn: 'Girl' },
    ],
  },
  {
    key: 'v_21',
    itemNumber: 21,
    group: 2,
    ageRangeAr: 'المجموعة الثانية (٥ - ٧ سنوات)',
    ageRangeEn: 'Group 2 (Ages 5-7)',
    correctPosition: 4,
    examinerCueAr: 'بص للصور كلها ووريني الصورة المختلفة اللي مفيش زيها.',
    options: [
      { position: 1, shapeKey: 'pot_upright_1', labelAr: 'أصيص زهرة متفتحة', labelEn: 'Blooming Flower Pot' },
      { position: 2, shapeKey: 'pot_upright_2', labelAr: 'أصيص زهرة متفتحة', labelEn: 'Blooming Daisy Pot' },
      { position: 3, shapeKey: 'pot_upright_3', labelAr: 'أصيص زهرة متفتحة', labelEn: 'Blooming Tulip Pot' },
      { position: 4, shapeKey: 'pot_wilted', labelAr: 'أصيص زهرة ذابلة', labelEn: 'Wilted Flower Pot' },
    ],
  },
  {
    key: 'v_22',
    itemNumber: 22,
    group: 2,
    ageRangeAr: 'المجموعة الثانية (٥ - ٧ سنوات)',
    ageRangeEn: 'Group 2 (Ages 5-7)',
    correctPosition: 3,
    examinerCueAr: 'بص للصور كلها ووريني الصورة المختلفة اللي مفيش زيها.',
    options: [
      { position: 1, shapeKey: 'man_fez', labelAr: 'رجل يرتدي طربوش', labelEn: 'Man with Fez' },
      { position: 2, shapeKey: 'man_cap_left', labelAr: 'رجل يرتدي طاقية', labelEn: 'Man with Cap' },
      { position: 3, shapeKey: 'man_bald', labelAr: 'رجل حاسر الرأس', labelEn: 'Bareheaded Man' },
      { position: 4, shapeKey: 'man_cap_right', labelAr: 'رجل يرتدي طاقية', labelEn: 'Man with Cap' },
    ],
  },
  {
    key: 'v_23',
    itemNumber: 23,
    group: 2,
    ageRangeAr: 'المجموعة الثانية (٥ - ٧ سنوات)',
    ageRangeEn: 'Group 2 (Ages 5-7)',
    correctPosition: 4,
    examinerCueAr: 'بص للصور كلها ووريني الصورة المختلفة اللي مفيش زيها.',
    options: [
      { position: 1, shapeKey: 'shoe_child', labelAr: 'حذاء طفل', labelEn: 'Child Shoe' },
      { position: 2, shapeKey: 'shoe_man', labelAr: 'حذاء رجالي', labelEn: 'Men Shoe' },
      { position: 3, shapeKey: 'shoe_heel', labelAr: 'حذاء بكعب', labelEn: 'Heeled Shoe' },
      { position: 4, shapeKey: 'cap_hat', labelAr: 'قبعة', labelEn: 'Cap' },
    ],
  },
  {
    key: 'v_24',
    itemNumber: 24,
    group: 2,
    ageRangeAr: 'المجموعة الثانية (٥ - ٧ سنوات)',
    ageRangeEn: 'Group 2 (Ages 5-7)',
    correctPosition: 1,
    examinerCueAr: 'بص للصور كلها ووريني الصورة المختلفة اللي مفيش زيها.',
    options: [
      { position: 1, shapeKey: 'circle_bar', labelAr: 'دائرة يتوسطها شريط متصل', labelEn: 'Circle with Through Bar' },
      { position: 2, shapeKey: 'oval_tabs_sm', labelAr: 'بيضوي بمقبضين', labelEn: 'Oval with Tabs' },
      { position: 3, shapeKey: 'oval_tabs_lg', labelAr: 'بيضوي كبير بمقبضين', labelEn: 'Large Oval with Tabs' },
      { position: 4, shapeKey: 'circle_tabs', labelAr: 'دائرة بمقبضين', labelEn: 'Circle with Tabs' },
    ],
  },
  {
    key: 'v_25',
    itemNumber: 25,
    group: 2,
    ageRangeAr: 'المجموعة الثانية (٥ - ٧ سنوات)',
    ageRangeEn: 'Group 2 (Ages 5-7)',
    correctPosition: 3,
    examinerCueAr: 'بص للصور كلها ووريني الصورة المختلفة اللي مفيش زيها.',
    options: [
      { position: 1, shapeKey: 'nefertiti', labelAr: 'تمثال نفرتيتي', labelEn: 'Nefertiti Bust' },
      { position: 2, shapeKey: 'tut_mask', labelAr: 'قناع فرعوني', labelEn: 'Pharaoh Mask' },
      { position: 3, shapeKey: 'pyramids', labelAr: 'الأهرامات', labelEn: 'Pyramids' },
      { position: 4, shapeKey: 'pharaoh_bust', labelAr: 'تمثال ملكي', labelEn: 'Royal Bust' },
    ],
  },
  {
    key: 'v_26',
    itemNumber: 26,
    group: 2,
    ageRangeAr: 'المجموعة الثانية (٥ - ٧ سنوات)',
    ageRangeEn: 'Group 2 (Ages 5-7)',
    correctPosition: 4,
    acceptedPositions: [4, 1],
    examinerCueAr: 'بص للصور كلها ووريني الصورة المختلفة اللي مفيش زيها.',
    options: [
      { position: 1, shapeKey: 'radio_box', labelAr: 'مذياع / جهاز', labelEn: 'Radio' },
      { position: 2, shapeKey: 'tv', labelAr: 'تلفاز', labelEn: 'Television' },
      { position: 3, shapeKey: 'telephone', labelAr: 'هاتف', labelEn: 'Telephone' },
      { position: 4, shapeKey: 'ladder', labelAr: 'سلم خشبي', labelEn: 'Wooden Ladder' },
    ],
  },
  {
    key: 'v_27',
    itemNumber: 27,
    group: 2,
    ageRangeAr: 'المجموعة الثانية (٥ - ٧ سنوات)',
    ageRangeEn: 'Group 2 (Ages 5-7)',
    correctPosition: 1,
    acceptedPositions: [1, 3],
    examinerCueAr: 'بص للصور كلها ووريني الصورة المختلفة اللي مفيش زيها.',
    options: [
      { position: 1, shapeKey: 'closed_square', labelAr: 'مربع مغلق', labelEn: 'Closed Square' },
      { position: 2, shapeKey: 'open_diamond', labelAr: 'معين مفتوح', labelEn: 'Open Diamond' },
      { position: 3, shapeKey: 'open_circle', labelAr: 'دائرة مفتوحة', labelEn: 'Open Circle' },
      { position: 4, shapeKey: 'open_oval', labelAr: 'بيضوي مفتوح', labelEn: 'Open Oval' },
    ],
  },
  {
    key: 'v_28',
    itemNumber: 28,
    group: 2,
    ageRangeAr: 'المجموعة الثانية (٥ - ٧ سنوات)',
    ageRangeEn: 'Group 2 (Ages 5-7)',
    correctPosition: 4,
    acceptedPositions: [4, 1],
    examinerCueAr: 'بص للصور كلها ووريني الصورة المختلفة اللي مفيش زيها.',
    options: [
      { position: 1, shapeKey: 'soccer_ball', labelAr: 'كرة دائرية', labelEn: 'Soccer Ball' },
      { position: 2, shapeKey: 'cross_circle', labelAr: 'دائرة مقسمة', labelEn: 'Crossed Circle' },
      { position: 3, shapeKey: 'wheel', labelAr: 'عجلة دائرية', labelEn: 'Wheel' },
      { position: 4, shapeKey: 'star', labelAr: 'نجمة', labelEn: 'Star' },
    ],
  },
  {
    key: 'v_29',
    itemNumber: 29,
    group: 2,
    ageRangeAr: 'المجموعة الثانية (٥ - ٧ سنوات)',
    ageRangeEn: 'Group 2 (Ages 5-7)',
    correctPosition: 2,
    examinerCueAr: 'بص للصور كلها ووريني الصورة المختلفة اللي مفيش زيها.',
    options: [
      { position: 1, shapeKey: 'saw', labelAr: 'منشار', labelEn: 'Saw' },
      { position: 2, shapeKey: 'key', labelAr: 'مفتاح', labelEn: 'Key' },
      { position: 3, shapeKey: 'pincers', labelAr: 'كماشة', labelEn: 'Pincers' },
      { position: 4, shapeKey: 'hammer', labelAr: 'مطرقة', labelEn: 'Hammer' },
    ],
  },
  {
    key: 'v_30',
    itemNumber: 30,
    group: 2,
    ageRangeAr: 'المجموعة الثانية (٥ - ٧ سنوات)',
    ageRangeEn: 'Group 2 (Ages 5-7)',
    correctPosition: 2,
    examinerCueAr: 'بص للصور كلها ووريني الصورة المختلفة اللي مفيش زيها.',
    options: [
      { position: 1, shapeKey: 'hand', labelAr: 'يد', labelEn: 'Hand' },
      { position: 2, shapeKey: 'cat_sitting', labelAr: 'وجه قطة', labelEn: 'Cat Face' },
      { position: 3, shapeKey: 'girl_bob', labelAr: 'وجه بنت', labelEn: 'Girl Face' },
      { position: 4, shapeKey: 'foot', labelAr: 'قدم', labelEn: 'Foot' },
    ],
  },

  // Group 3 (31 - 45) — Ages 7-9 — 5 options per card (2 matching pairs + 1 odd)
  {
    key: 'v_31',
    itemNumber: 31,
    group: 3,
    ageRangeAr: 'المجموعة الثالثة (٧ - ٩ سنوات)',
    ageRangeEn: 'Group 3 (Ages 7-9)',
    correctPosition: 5,
    examinerCueAr: 'لاحظ أن فيه صور أكثر في البطاقات دي (خمس صور)... بص للصور كلها ووريني فين الصورة المختلفة اللي مفيش زيها.',
    options: [
      { position: 1, shapeKey: 'chick_large', labelAr: 'طائر كبير', labelEn: 'Large Bird' },
      { position: 2, shapeKey: 'chick_small', labelAr: 'طائر صغير', labelEn: 'Small Bird' },
      { position: 3, shapeKey: 'palm_large', labelAr: 'نخلة كبيرة', labelEn: 'Large Palm' },
      { position: 4, shapeKey: 'palm_small', labelAr: 'نخلة صغيرة', labelEn: 'Small Palm' },
      { position: 5, shapeKey: 'ducks_pair', labelAr: 'دميتان', labelEn: 'Pair of Dolls' },
    ],
  },
  {
    key: 'v_32',
    itemNumber: 32,
    group: 3,
    ageRangeAr: 'المجموعة الثالثة (٧ - ٩ سنوات)',
    ageRangeEn: 'Group 3 (Ages 7-9)',
    correctPosition: 3,
    examinerCueAr: 'بص للصور كلها ووريني الصورة المختلفة اللي مفيش زيها.',
    options: [
      { position: 1, shapeKey: 'umbrella_closed', labelAr: 'شمسية مغلقة', labelEn: 'Closed Umbrella' },
      { position: 2, shapeKey: 'scissors_closed', labelAr: 'مقص مغلق', labelEn: 'Closed Scissors' },
      { position: 3, shapeKey: 'house', labelAr: 'بيت', labelEn: 'House' },
      { position: 4, shapeKey: 'scissors_open', labelAr: 'مقص مفتوح', labelEn: 'Open Scissors' },
      { position: 5, shapeKey: 'umbrella_open', labelAr: 'شمسية مفتوحة', labelEn: 'Open Umbrella' },
    ],
  },
  {
    key: 'v_33',
    itemNumber: 33,
    group: 3,
    ageRangeAr: 'المجموعة الثالثة (٧ - ٩ سنوات)',
    ageRangeEn: 'Group 3 (Ages 7-9)',
    correctPosition: 4,
    acceptedPositions: [4, 2],
    examinerCueAr: 'بص للصور كلها ووريني الصورة المختلفة اللي مفيش زيها.',
    options: [
      { position: 1, shapeKey: 'sailor_boy', labelAr: 'ولد بزي بحار', labelEn: 'Sailor Boy' },
      { position: 2, shapeKey: 'stick_boy', labelAr: 'ولد بعصا', labelEn: 'Boy with Stick' },
      { position: 3, shapeKey: 'sailor_boy', labelAr: 'ولد بزي بحار', labelEn: 'Sailor Boy' },
      { position: 4, shapeKey: 'girl_coat', labelAr: 'بنت بمعطف', labelEn: 'Girl in Coat' },
      { position: 5, shapeKey: 'stick_boy', labelAr: 'ولد بعصا', labelEn: 'Boy with Stick' },
    ],
  },
  {
    key: 'v_34',
    itemNumber: 34,
    group: 3,
    ageRangeAr: 'المجموعة الثالثة (٧ - ٩ سنوات)',
    ageRangeEn: 'Group 3 (Ages 7-9)',
    correctPosition: 2,
    examinerCueAr: 'بص للصور كلها ووريني الصورة المختلفة اللي مفيش زيها.',
    options: [
      { position: 1, shapeKey: 'boy_bike', labelAr: 'ولد على دراجة', labelEn: 'Boy on Bike' },
      { position: 2, shapeKey: 'dog_standing', labelAr: 'كلب', labelEn: 'Dog' },
      { position: 3, shapeKey: 'girl_bike', labelAr: 'بنت على دراجة', labelEn: 'Girl on Bike' },
      { position: 4, shapeKey: 'girl_curls', labelAr: 'وجه بنت', labelEn: 'Girl Face' },
      { position: 5, shapeKey: 'boy_smiling', labelAr: 'وجه ولد', labelEn: 'Boy Face' },
    ],
  },
  {
    key: 'v_35',
    itemNumber: 35,
    group: 3,
    ageRangeAr: 'المجموعة الثالثة (٧ - ٩ سنوات)',
    ageRangeEn: 'Group 3 (Ages 7-9)',
    correctPosition: 2,
    examinerCueAr: 'بص للصور كلها ووريني الصورة المختلفة اللي مفيش زيها.',
    options: [
      { position: 1, shapeKey: 'kettle', labelAr: 'براد شاي', labelEn: 'Kettle' },
      { position: 2, shapeKey: 'saw', labelAr: 'منشار', labelEn: 'Saw' },
      { position: 3, shapeKey: 'cup', labelAr: 'فنجان', labelEn: 'Cup' },
      { position: 4, shapeKey: 'glass', labelAr: 'كوب زجاجي', labelEn: 'Glass' },
      { position: 5, shapeKey: 'pitcher', labelAr: 'إبريق', labelEn: 'Pitcher' },
    ],
  },
  {
    key: 'v_36',
    itemNumber: 36,
    group: 3,
    ageRangeAr: 'المجموعة الثالثة (٧ - ٩ سنوات)',
    ageRangeEn: 'Group 3 (Ages 7-9)',
    correctPosition: 3,
    examinerCueAr: 'بص للصور كلها ووريني الصورة المختلفة اللي مفيش زيها.',
    options: [
      { position: 1, shapeKey: 'desk', labelAr: 'مكتب', labelEn: 'Desk' },
      { position: 2, shapeKey: 'spoon', labelAr: 'ملعقة', labelEn: 'Spoon' },
      { position: 3, shapeKey: 'grapes', labelAr: 'عنب', labelEn: 'Grapes' },
      { position: 4, shapeKey: 'chair', labelAr: 'كرسي', labelEn: 'Chair' },
      { position: 5, shapeKey: 'fork', labelAr: 'شوكة', labelEn: 'Fork' },
    ],
  },
  {
    key: 'v_37',
    itemNumber: 37,
    group: 3,
    ageRangeAr: 'المجموعة الثالثة (٧ - ٩ سنوات)',
    ageRangeEn: 'Group 3 (Ages 7-9)',
    correctPosition: 2,
    examinerCueAr: 'بص للصور كلها ووريني الصورة المختلفة اللي مفيش زيها.',
    options: [
      { position: 1, shapeKey: 'hen', labelAr: 'دجاجة', labelEn: 'Hen' },
      { position: 2, shapeKey: 'banana', labelAr: 'موزة', labelEn: 'Banana' },
      { position: 3, shapeKey: 'man_head', labelAr: 'رجل', labelEn: 'Man' },
      { position: 4, shapeKey: 'woman_head', labelAr: 'امرأة', labelEn: 'Woman' },
      { position: 5, shapeKey: 'rooster', labelAr: 'ديك', labelEn: 'Rooster' },
    ],
  },
  {
    key: 'v_38',
    itemNumber: 38,
    group: 3,
    ageRangeAr: 'المجموعة الثالثة (٧ - ٩ سنوات)',
    ageRangeEn: 'Group 3 (Ages 7-9)',
    correctPosition: 5,
    examinerCueAr: 'بص للصور كلها ووريني الصورة المختلفة اللي مفيش زيها.',
    options: [
      { position: 1, shapeKey: 'pot_single_daisy', labelAr: 'أصيص بزهرة واحدة', labelEn: 'Single Daisy Pot' },
      { position: 2, shapeKey: 'pot_drooping_buds', labelAr: 'أصيص ببراعم وزهرة متدلية', labelEn: 'Buds & Drooping Pot' },
      { position: 3, shapeKey: 'pot_single_daisy', labelAr: 'أصيص بزهرة واحدة', labelEn: 'Single Daisy Pot' },
      { position: 4, shapeKey: 'pot_drooping_buds', labelAr: 'أصيص ببراعم وزهرة متدلية', labelEn: 'Buds & Drooping Pot' },
      { position: 5, shapeKey: 'pot_mixed_daisy', labelAr: 'أصيص مختلط بزهرة متفتحة وبراعم', labelEn: 'Mixed Daisy & Buds Pot' },
    ],
  },
  {
    key: 'v_39',
    itemNumber: 39,
    group: 3,
    ageRangeAr: 'المجموعة الثالثة (٧ - ٩ سنوات)',
    ageRangeEn: 'Group 3 (Ages 7-9)',
    correctPosition: 4,
    examinerCueAr: 'بص للصور كلها ووريني الصورة المختلفة اللي مفيش زيها.',
    options: [
      { position: 1, shapeKey: 'bicycle', labelAr: 'دراجة', labelEn: 'Bicycle' },
      { position: 2, shapeKey: 'hen', labelAr: 'طائر', labelEn: 'Bird' },
      { position: 3, shapeKey: 'goose', labelAr: 'بطة / إوزة', labelEn: 'Goose' },
      { position: 4, shapeKey: 'trumpet', labelAr: 'بوق موسيقي', labelEn: 'Trumpet' },
      { position: 5, shapeKey: 'car', labelAr: 'سيارة', labelEn: 'Car' },
    ],
  },
  {
    key: 'v_40',
    itemNumber: 40,
    group: 3,
    ageRangeAr: 'المجموعة الثالثة (٧ - ٩ سنوات)',
    ageRangeEn: 'Group 3 (Ages 7-9)',
    correctPosition: 5,
    examinerCueAr: 'بص للصور كلها ووريني الصورة المختلفة اللي مفيش زيها.',
    options: [
      { position: 1, shapeKey: 'foot', labelAr: 'قدم', labelEn: 'Foot' },
      { position: 2, shapeKey: 'cup', labelAr: 'فنجان', labelEn: 'Cup' },
      { position: 3, shapeKey: 'boot', labelAr: 'حذاء برقبة', labelEn: 'Boot' },
      { position: 4, shapeKey: 'saucer', labelAr: 'طبق فنجان', labelEn: 'Saucer' },
      { position: 5, shapeKey: 'mosque', labelAr: 'مسجد', labelEn: 'Mosque' },
    ],
  },
  {
    key: 'v_41',
    itemNumber: 41,
    group: 3,
    ageRangeAr: 'المجموعة الثالثة (٧ - ٩ سنوات)',
    ageRangeEn: 'Group 3 (Ages 7-9)',
    correctPosition: 3,
    examinerCueAr: 'بص للصور كلها ووريني الصورة المختلفة اللي مفيش زيها.',
    options: [
      { position: 1, shapeKey: 'flag_normal', labelAr: 'علم (الأسود بالأعلى)', labelEn: 'Flag (Dark Top)' },
      { position: 2, shapeKey: 'flag_normal', labelAr: 'علم (الأسود بالأعلى)', labelEn: 'Flag (Dark Top)' },
      { position: 3, shapeKey: 'flag_reversed', labelAr: 'علم مقلوب الألوان', labelEn: 'Reversed Flag' },
      { position: 4, shapeKey: 'flag_normal', labelAr: 'علم (الأسود بالأعلى)', labelEn: 'Flag (Dark Top)' },
      { position: 5, shapeKey: 'flag_normal', labelAr: 'علم (الأسود بالأعلى)', labelEn: 'Flag (Dark Top)' },
    ],
  },
  {
    key: 'v_42',
    itemNumber: 42,
    group: 3,
    ageRangeAr: 'المجموعة الثالثة (٧ - ٩ سنوات)',
    ageRangeEn: 'Group 3 (Ages 7-9)',
    correctPosition: 4,
    examinerCueAr: 'بص للصور كلها ووريني الصورة المختلفة اللي مفيش زيها.',
    options: [
      { position: 1, shapeKey: 'padlock', labelAr: 'قفل', labelEn: 'Padlock' },
      { position: 2, shapeKey: 'hammer', labelAr: 'مطرقة', labelEn: 'Hammer' },
      { position: 3, shapeKey: 'key', labelAr: 'مفتاح', labelEn: 'Key' },
      { position: 4, shapeKey: 'eyeglasses', labelAr: 'نظارة', labelEn: 'Eyeglasses' },
      { position: 5, shapeKey: 'nail', labelAr: 'مسمار', labelEn: 'Nail' },
    ],
  },
  {
    key: 'v_43',
    itemNumber: 43,
    group: 3,
    ageRangeAr: 'المجموعة الثالثة (٧ - ٩ سنوات)',
    ageRangeEn: 'Group 3 (Ages 7-9)',
    correctPosition: 1,
    examinerCueAr: 'بص للصور كلها ووريني الصورة المختلفة اللي مفيش زيها.',
    options: [
      { position: 1, shapeKey: 'soccer_ball', labelAr: 'كرة قدم', labelEn: 'Soccer Ball' },
      { position: 2, shapeKey: 'fork', labelAr: 'شوكة', labelEn: 'Fork' },
      { position: 3, shapeKey: 'car', labelAr: 'سيارة', labelEn: 'Car' },
      { position: 4, shapeKey: 'spoon', labelAr: 'ملعقة', labelEn: 'Spoon' },
      { position: 5, shapeKey: 'bicycle', labelAr: 'دراجة', labelEn: 'Bicycle' },
    ],
  },
  {
    key: 'v_44',
    itemNumber: 44,
    group: 3,
    ageRangeAr: 'المجموعة الثالثة (٧ - ٩ سنوات)',
    ageRangeEn: 'Group 3 (Ages 7-9)',
    correctPosition: 4,
    examinerCueAr: 'بص للصور كلها ووريني الصورة المختلفة اللي مفيش زيها.',
    options: [
      { position: 1, shapeKey: 'lantern', labelAr: 'فانوس', labelEn: 'Lantern' },
      { position: 2, shapeKey: 'phone_base', labelAr: 'قرص هاتف', labelEn: 'Phone Base' },
      { position: 3, shapeKey: 'candle', labelAr: 'شمعة', labelEn: 'Candle' },
      { position: 4, shapeKey: 'airplane', labelAr: 'طائرة', labelEn: 'Airplane' },
      { position: 5, shapeKey: 'handset', labelAr: 'سماعة هاتف', labelEn: 'Handset' },
    ],
  },
  {
    key: 'v_45',
    itemNumber: 45,
    group: 3,
    ageRangeAr: 'المجموعة الثالثة (٧ - ٩ سنوات)',
    ageRangeEn: 'Group 3 (Ages 7-9)',
    correctPosition: 1,
    examinerCueAr: 'بص للصور كلها ووريني الصورة المختلفة اللي مفيش زيها.',
    options: [
      { position: 1, shapeKey: 'baby_head', labelAr: 'طفل رضيع', labelEn: 'Baby' },
      { position: 2, shapeKey: 'old_man_head', labelAr: 'رجل مسن', labelEn: 'Old Man' },
      { position: 3, shapeKey: 'woman_head', labelAr: 'امرأة شابة', labelEn: 'Young Woman' },
      { position: 4, shapeKey: 'old_woman_head', labelAr: 'سيدة مسنة', labelEn: 'Old Woman' },
      { position: 5, shapeKey: 'man_head', labelAr: 'رجل شاب', labelEn: 'Young Man' },
    ],
  },
];

export const VERBAL_TRAINING_ITEMS: VerbalItem[] = [
  {
    key: 'train_l_a',
    itemNumber: null,
    group: 'training',
    ageRangeAr: 'مثال تدريبي (أ)',
    ageRangeEn: 'Training Example (A)',
    promptAr: 'بابا راجل، وماما ....',
    promptEn: 'Papa is a man, and Mama is a ....',
    acceptedAnswers: ['ست', 'امرأة', 'سيدة'],
    examinerCueAr: 'هقول شوية جمل فيها كلمات ناقصة، وأنت تسمعها كويس وتكمل الكلام الناقص. مثال: بابا راجل، وماما (ايه)؟ يبقى أنت تقول (ست).',
  },
  {
    key: 'train_l_b',
    itemNumber: null,
    group: 'training',
    ageRangeAr: 'مثال تدريبي (ب)',
    ageRangeEn: 'Training Example (B)',
    promptAr: 'واحد وواحد كام ....',
    promptEn: 'One and one equals ....',
    acceptedAnswers: ['اتنين', 'اثنين', '٢', '2'],
    examinerCueAr: 'شجع الطفل عند النجاح بقولك «كويس، شاطر»، وإذا أخطأ اشرح له الإجابة دون احتساب درجة.',
  },
  {
    key: 'train_l_c',
    itemNumber: null,
    group: 'training',
    ageRangeAr: 'مثال تدريبي (ج)',
    ageRangeEn: 'Training Example (C)',
    promptAr: 'ألبس الساعة في إيدي، وألبس الجزمة ....',
    promptEn: 'I wear the watch on my hand, and I wear the shoe ....',
    acceptedAnswers: ['في رجلي', 'رجلي', 'قدمي'],
    examinerCueAr: 'تأكد من فهم الطفل لطريقة الإجابة قبل الانتقال للجمل الرسمية.',
  },
];

export const VERBAL_ITEMS: VerbalItem[] = [
  // Group 1 (1 - 15) — Ages 3-5
  {
    key: 'l_1',
    itemNumber: 1,
    group: 1,
    ageRangeAr: 'المجموعة الأولى (٣ - ٥ سنوات)',
    ageRangeEn: 'Group 1 (Ages 3-5)',
    promptAr: 'اللحمة ناكلها، والشاي ....',
    promptEn: 'We eat meat, and tea we ....',
    acceptedAnswers: ['نشربه', 'شرب', 'نشرب'],
    examinerCueAr: 'اقرأ الجملة بوضوح مخارج الألفاظ وبسرعة معتدلة.',
  },
  {
    key: 'l_2',
    itemNumber: 2,
    group: 1,
    ageRangeAr: 'المجموعة الأولى (٣ - ٥ سنوات)',
    ageRangeEn: 'Group 1 (Ages 3-5)',
    promptAr: 'الكورة نلعب بها، والبرتقالة ....',
    promptEn: 'We play with the ball, and the orange we ....',
    acceptedAnswers: ['ناكلها', 'نأكلها', 'أكل'],
    examinerCueAr: 'بعد أنا ما أقول الكلام أنت تكمل الناقص.',
  },
  {
    key: 'l_3',
    itemNumber: 3,
    group: 1,
    ageRangeAr: 'المجموعة الأولى (٣ - ٥ سنوات)',
    ageRangeEn: 'Group 1 (Ages 3-5)',
    promptAr: 'نقص القماش بالمقص، ونقطع اللحمة ....',
    promptEn: 'We cut cloth with scissors, and we cut meat with ....',
    acceptedAnswers: ['السكين', 'بالسكين', 'بالسكينة', 'السكينة', 'الساطور', 'بالساطور'],
    examinerCueAr: 'يمكن إعادة الجملة مرة ثانية أو ثالثة على الأكثر عند الحاجة.',
  },
  {
    key: 'l_4',
    itemNumber: 4,
    group: 1,
    ageRangeAr: 'المجموعة الأولى (٣ - ٥ سنوات)',
    ageRangeEn: 'Group 1 (Ages 3-5)',
    promptAr: 'الفيل كبير، والفار ....',
    promptEn: 'The elephant is big, and the mouse is ....',
    acceptedAnswers: ['صغير', 'صغنن'],
    examinerCueAr: 'اقرأ بوضوح دون تلميح للإجابة.',
  },
  {
    key: 'l_5',
    itemNumber: 5,
    group: 1,
    ageRangeAr: 'المجموعة الأولى (٣ - ٥ سنوات)',
    ageRangeEn: 'Group 1 (Ages 3-5)',
    promptAr: 'بنمشي على رجلينا، وبنمسك الحاجة ....',
    promptEn: 'We walk on our feet, and we hold things with ....',
    acceptedAnswers: ['بإيدينا', 'بيدينا', 'إيدينا', 'ايدينا', 'يدينا'],
    examinerCueAr: 'اقرأ بوضوح دون تلميح للإجابة.',
  },
  {
    key: 'l_6',
    itemNumber: 6,
    group: 1,
    ageRangeAr: 'المجموعة الأولى (٣ - ٥ سنوات)',
    ageRangeEn: 'Group 1 (Ages 3-5)',
    promptAr: 'القلم نكتب به، والمعلقة ....',
    promptEn: 'We write with a pen, and with a spoon we ....',
    acceptedAnswers: ['ناكل بها', 'نأكل بها', 'نقلب بها', 'ناكل', 'نقلب'],
    examinerCueAr: 'اقرأ بوضوح دون تلميح للإجابة.',
  },
  {
    key: 'l_7',
    itemNumber: 7,
    group: 1,
    ageRangeAr: 'المجموعة الأولى (٣ - ٥ سنوات)',
    ageRangeEn: 'Group 1 (Ages 3-5)',
    promptAr: 'نشوف التليفزيون بعينينا، ونشم الورد ....',
    promptEn: 'We watch TV with our eyes, and we smell roses with ....',
    acceptedAnswers: ['مناخيرنا', 'بمناخيرنا', 'بالأنف', 'الأنف', 'بانفنا'],
    examinerCueAr: 'اقرأ بوضوح دون تلميح للإجابة.',
  },
  {
    key: 'l_8',
    itemNumber: 8,
    group: 1,
    ageRangeAr: 'المجموعة الأولى (٣ - ٥ سنوات)',
    ageRangeEn: 'Group 1 (Ages 3-5)',
    promptAr: 'السماء زرقاء، واللبن ....',
    promptEn: 'The sky is blue, and milk is ....',
    acceptedAnswers: ['أبيض', 'ابيض'],
    examinerCueAr: 'اقرأ بوضوح دون تلميح للإجابة.',
  },
  {
    key: 'l_9',
    itemNumber: 9,
    group: 1,
    ageRangeAr: 'المجموعة الأولى (٣ - ٥ سنوات)',
    ageRangeEn: 'Group 1 (Ages 3-5)',
    promptAr: 'لما أعطش أشرب، ولما أجوع ....',
    promptEn: 'When I am thirsty I drink, and when I am hungry I ....',
    acceptedAnswers: ['آكل', 'اكل', 'أكل', 'باكل'],
    examinerCueAr: 'اقرأ بوضوح دون تلميح للإجابة.',
  },
  {
    key: 'l_10',
    itemNumber: 10,
    group: 1,
    ageRangeAr: 'المجموعة الأولى (٣ - ٥ سنوات)',
    ageRangeEn: 'Group 1 (Ages 3-5)',
    promptAr: 'العصفور يطير، والسمكة ....',
    promptEn: 'The bird flies, and the fish ....',
    acceptedAnswers: ['تعوم', 'بتعوم', 'تسبح'],
    examinerCueAr: 'اقرأ بوضوح دون تلميح للإجابة.',
  },
  {
    key: 'l_11',
    itemNumber: 11,
    group: 1,
    ageRangeAr: 'المجموعة الأولى (٣ - ٥ سنوات)',
    ageRangeEn: 'Group 1 (Ages 3-5)',
    promptAr: 'البيوت علشان نسكن فيها، والكتب علشان ....',
    promptEn: 'Houses are for living in, and books are for ....',
    acceptedAnswers: ['نقرأ فيها', 'نقرا فيها', 'نذاكر فيها', 'نقرأ', 'نذاكر'],
    examinerCueAr: 'اقرأ بوضوح دون تلميح للإجابة.',
  },
  {
    key: 'l_12',
    itemNumber: 12,
    group: 1,
    ageRangeAr: 'المجموعة الأولى (٣ - ٥ سنوات)',
    ageRangeEn: 'Group 1 (Ages 3-5)',
    promptAr: 'العين نشوف بها، والودن ....',
    promptEn: 'We see with the eye, and with the ear we ....',
    acceptedAnswers: ['نسمع بها', 'نسمع', 'نسمع بيها'],
    examinerCueAr: 'اقرأ بوضوح دون تلميح للإجابة.',
  },
  {
    key: 'l_13',
    itemNumber: 13,
    group: 1,
    ageRangeAr: 'المجموعة الأولى (٣ - ٥ سنوات)',
    ageRangeEn: 'Group 1 (Ages 3-5)',
    promptAr: 'فاطمة بنت، ومحمد ....',
    promptEn: 'Fatma is a girl, and Mohamed is a ....',
    acceptedAnswers: ['ولد'],
    examinerCueAr: 'اقرأ بوضوح دون تلميح للإجابة.',
  },
  {
    key: 'l_14',
    itemNumber: 14,
    group: 1,
    ageRangeAr: 'المجموعة الأولى (٣ - ٥ سنوات)',
    ageRangeEn: 'Group 1 (Ages 3-5)',
    promptAr: 'نشتري الخضار من الخضري، ونشتري الدواء من ....',
    promptEn: 'We buy vegetables from the greengrocer, and we buy medicine from ....',
    acceptedAnswers: ['أجزخانة', 'الاجزخانة', 'دكتور', 'الدكتور', 'صيدلية', 'الصيدلية'],
    examinerCueAr: 'اقرأ بوضوح دون تلميح للإجابة.',
  },
  {
    key: 'l_15',
    itemNumber: 15,
    group: 1,
    ageRangeAr: 'المجموعة الأولى (٣ - ٥ سنوات)',
    ageRangeEn: 'Group 1 (Ages 3-5)',
    promptAr: 'البسكلتة لها عجلتين، والعربية لها ....',
    promptEn: 'A bicycle has two wheels, and a car has ....',
    acceptedAnswers: ['أربعة', 'اربعة', '٤', '4'],
    examinerCueAr: 'اقرأ بوضوح دون تلميح للإجابة.',
  },

  // Group 2 (16 - 30) — Ages 5-7
  {
    key: 'l_16',
    itemNumber: 16,
    group: 2,
    ageRangeAr: 'المجموعة الثانية (٥ - ٧ سنوات)',
    ageRangeEn: 'Group 2 (Ages 5-7)',
    promptAr: 'الراجل طويل، والطفل ....',
    promptEn: 'The man is tall, and the child is ....',
    acceptedAnswers: ['قصير', 'صغير'],
    examinerCueAr: 'الجمل للمرحلة العمرية ٥-٧ سنوات (نقطة البدء لمن هم ٦ سنوات فأكثر).',
  },
  {
    key: 'l_17',
    itemNumber: 17,
    group: 2,
    ageRangeAr: 'المجموعة الثانية (٥ - ٧ سنوات)',
    ageRangeEn: 'Group 2 (Ages 5-7)',
    promptAr: 'الشارع واسع، والحارة ....',
    promptEn: 'The street is wide, and the alley is ....',
    acceptedAnswers: ['ضيقة', 'ضيق'],
    examinerCueAr: 'اقرأ بوضوح دون تلميح للإجابة.',
  },
  {
    key: 'l_18',
    itemNumber: 18,
    group: 2,
    ageRangeAr: 'المجموعة الثانية (٥ - ٧ سنوات)',
    ageRangeEn: 'Group 2 (Ages 5-7)',
    promptAr: 'الليمون حاذق، والسكر ....',
    promptEn: 'Lemons are sour, and sugar is ....',
    acceptedAnswers: ['حلو', 'مسكر', 'معسل'],
    examinerCueAr: 'اقرأ بوضوح دون تلميح للإجابة.',
  },
  {
    key: 'l_19',
    itemNumber: 19,
    group: 2,
    ageRangeAr: 'المجموعة الثانية (٥ - ٧ سنوات)',
    ageRangeEn: 'Group 2 (Ages 5-7)',
    promptAr: 'خالي أخو ماما، وعمي أخو ....',
    promptEn: 'My maternal uncle is Mom’s brother, and my paternal uncle is ....',
    acceptedAnswers: ['بابا', 'أبي', 'ابويا'],
    examinerCueAr: 'اقرأ بوضوح دون تلميح للإجابة.',
  },
  {
    key: 'l_20',
    itemNumber: 20,
    group: 2,
    ageRangeAr: 'المجموعة الثانية (٥ - ٧ سنوات)',
    ageRangeEn: 'Group 2 (Ages 5-7)',
    promptAr: 'العامل يشتغل في المصنع، والتلميذ يتعلم في ....',
    promptEn: 'The worker works in the factory, and the student learns in ....',
    acceptedAnswers: ['المدرسة', 'مدرسة', 'الكلية', 'الجامعة'],
    examinerCueAr: 'اقرأ بوضوح دون تلميح للإجابة.',
  },
  {
    key: 'l_21',
    itemNumber: 21,
    group: 2,
    ageRangeAr: 'المجموعة الثانية (٥ - ٧ سنوات)',
    ageRangeEn: 'Group 2 (Ages 5-7)',
    promptAr: 'الشمس تطلع بالنهار، والقمر يطلع ....',
    promptEn: 'The sun comes out during the day, and the moon comes out ....',
    acceptedAnswers: ['بالليل', 'في الليل', 'ليل'],
    examinerCueAr: 'اقرأ بوضوح دون تلميح للإجابة.',
  },
  {
    key: 'l_22',
    itemNumber: 22,
    group: 2,
    ageRangeAr: 'المجموعة الثانية (٥ - ٧ سنوات)',
    ageRangeEn: 'Group 2 (Ages 5-7)',
    promptAr: 'في الشتاء نلبس هدوم ثقيلة، وفي الصيف نلبس هدوم ....',
    promptEn: 'In winter we wear heavy clothes, and in summer we wear .... clothes.',
    acceptedAnswers: ['خفيفة', 'صيفي'],
    examinerCueAr: 'اقرأ بوضوح دون تلميح للإجابة.',
  },
  {
    key: 'l_23',
    itemNumber: 23,
    group: 2,
    ageRangeAr: 'المجموعة الثانية (٥ - ٧ سنوات)',
    ageRangeEn: 'Group 2 (Ages 5-7)',
    promptAr: 'الجزار يقطع اللحمة بالسكينة، والنجار يقطع الخشب ....',
    promptEn: 'The butcher cuts meat with a knife, and the carpenter cuts wood ....',
    acceptedAnswers: ['بالمنشار', 'منشار', 'بالماكينة'],
    examinerCueAr: 'اقرأ بوضوح دون تلميح للإجابة.',
  },
  {
    key: 'l_24',
    itemNumber: 24,
    group: 2,
    ageRangeAr: 'المجموعة الثانية (٥ - ٧ سنوات)',
    ageRangeEn: 'Group 2 (Ages 5-7)',
    promptAr: 'الصبيان لما يكبروا يبقوا رجالة، والبنات تبقى ....',
    promptEn: 'Boys grow up to become men, and girls grow up to become ....',
    acceptedAnswers: ['ستات', 'نساء', 'سيدات'],
    examinerCueAr: 'اقرأ بوضوح دون تلميح للإجابة.',
  },
  {
    key: 'l_25',
    itemNumber: 25,
    group: 2,
    ageRangeAr: 'المجموعة الثانية (٥ - ٧ سنوات)',
    ageRangeEn: 'Group 2 (Ages 5-7)',
    promptAr: 'الكلب له أربع رجلين، والبطة لها ....',
    promptEn: 'A dog has four legs, and a duck has ....',
    acceptedAnswers: ['اتنين', 'اثنين', 'رجلين', '٢', '2'],
    examinerCueAr: 'اقرأ بوضوح دون تلميح للإجابة.',
  },
  {
    key: 'l_26',
    itemNumber: 26,
    group: 2,
    ageRangeAr: 'المجموعة الثانية (٥ - ٧ سنوات)',
    ageRangeEn: 'Group 2 (Ages 5-7)',
    promptAr: 'الفلاح يزرع الأرض، والدكتور يعالج ....',
    promptEn: 'The farmer farms the land, and the doctor treats ....',
    acceptedAnswers: ['العيان', 'المريض', 'المرضى', 'العيانين'],
    examinerCueAr: 'اقرأ بوضوح دون تلميح للإجابة.',
  },
  {
    key: 'l_27',
    itemNumber: 27,
    group: 2,
    ageRangeAr: 'المجموعة الثانية (٥ - ٧ سنوات)',
    ageRangeEn: 'Group 2 (Ages 5-7)',
    promptAr: 'القطة تولد، والفرخة ....',
    promptEn: 'The cat gives birth, and the hen ....',
    acceptedAnswers: ['تبيض', 'بتبيض'],
    examinerCueAr: 'اقرأ بوضوح دون تلميح للإجابة.',
  },
  {
    key: 'l_28',
    itemNumber: 28,
    group: 2,
    ageRangeAr: 'المجموعة الثانية (٥ - ٧ سنوات)',
    ageRangeEn: 'Group 2 (Ages 5-7)',
    promptAr: 'السبت بعده الأحد، والخميس بعده ....',
    promptEn: 'After Saturday comes Sunday, and after Thursday comes ....',
    acceptedAnswers: ['الجمعة', 'جمعة'],
    examinerCueAr: 'اقرأ بوضوح دون تلميح للإجابة.',
  },
  {
    key: 'l_29',
    itemNumber: 29,
    group: 2,
    ageRangeAr: 'المجموعة الثانية (٥ - ٧ سنوات)',
    ageRangeEn: 'Group 2 (Ages 5-7)',
    promptAr: 'البلح لونه أحمر، والذهب لونه ....',
    promptEn: 'Dates are red, and gold is ....',
    acceptedAnswers: ['أصفر', 'اصفر', 'أبيض'],
    examinerCueAr: 'اقرأ بوضوح دون تلميح للإجابة.',
  },
  {
    key: 'l_30',
    itemNumber: 30,
    group: 2,
    ageRangeAr: 'المجموعة الثانية (٥ - ٧ سنوات)',
    ageRangeEn: 'Group 2 (Ages 5-7)',
    promptAr: 'الحمام له منقار، والفيل له ....',
    promptEn: 'The pigeon has a beak, and the elephant has a ....',
    acceptedAnswers: ['زلومة', 'خرطوم'],
    examinerCueAr: 'اقرأ بوضوح دون تلميح للإجابة.',
  },

  // Group 3 (31 - 45) — Ages 7-9
  {
    key: 'l_31',
    itemNumber: 31,
    group: 3,
    ageRangeAr: 'المجموعة الثالثة (٧ - ٩ سنوات)',
    ageRangeEn: 'Group 3 (Ages 7-9)',
    promptAr: 'القطار يقف في المحطة، والطيارة تقف في ....',
    promptEn: 'The train stops at the station, and the airplane stops at the ....',
    acceptedAnswers: ['المطار', 'مطار'],
    examinerCueAr: 'الجمل للمرحلة العمرية ٧-٩ سنوات.',
  },
  {
    key: 'l_32',
    itemNumber: 32,
    group: 3,
    ageRangeAr: 'المجموعة الثالثة (٧ - ٩ سنوات)',
    ageRangeEn: 'Group 3 (Ages 7-9)',
    promptAr: 'نستعمل الدفاية في التدفئة، ونستعمل المروحة في ....',
    promptEn: 'We use the heater for warming, and we use the fan for ....',
    acceptedAnswers: ['الهوا', 'الهواء', 'تهوية', 'التهوية', 'التبريد'],
    examinerCueAr: 'اقرأ بوضوح دون تلميح للإجابة.',
  },
  {
    key: 'l_33',
    itemNumber: 33,
    group: 3,
    ageRangeAr: 'المجموعة الثالثة (٧ - ٩ سنوات)',
    ageRangeEn: 'Group 3 (Ages 7-9)',
    promptAr: 'أبو بابا جدي، وأم ماما ....',
    promptEn: 'Dad’s father is my grandfather, and Mom’s mother is my ....',
    acceptedAnswers: ['جدتي', 'ستي', 'نينة', 'تيتة'],
    examinerCueAr: 'اقرأ بوضوح دون تلميح للإجابة.',
  },
  {
    key: 'l_34',
    itemNumber: 34,
    group: 3,
    ageRangeAr: 'المجموعة الثالثة (٧ - ٩ سنوات)',
    ageRangeEn: 'Group 3 (Ages 7-9)',
    promptAr: 'نعمل السكر من القصب، ونعمل العيش من ....',
    promptEn: 'We make sugar from sugarcane, and we make bread from ....',
    acceptedAnswers: ['الدقيق', 'العجين', 'القمح', 'دقيق', 'قمح'],
    examinerCueAr: 'اقرأ بوضوح دون تلميح للإجابة.',
  },
  {
    key: 'l_35',
    itemNumber: 35,
    group: 3,
    ageRangeAr: 'المجموعة الثالثة (٧ - ٩ سنوات)',
    ageRangeEn: 'Group 3 (Ages 7-9)',
    promptAr: 'أخت بابا عمتي، وأخت ماما ....',
    promptEn: 'Dad’s sister is my paternal aunt, and Mom’s sister is my ....',
    acceptedAnswers: ['خالتي'],
    examinerCueAr: 'اقرأ بوضوح دون تلميح للإجابة.',
  },
  {
    key: 'l_36',
    itemNumber: 36,
    group: 3,
    ageRangeAr: 'المجموعة الثالثة (٧ - ٩ سنوات)',
    ageRangeEn: 'Group 3 (Ages 7-9)',
    promptAr: 'البامية والملوخية خضار، والعنب والموز ....',
    promptEn: 'Okra and molokhia are vegetables, and grapes and bananas are ....',
    acceptedAnswers: ['فاكهة', 'فواكه'],
    examinerCueAr: 'اقرأ بوضوح دون تلميح للإجابة.',
  },
  {
    key: 'l_37',
    itemNumber: 37,
    group: 3,
    ageRangeAr: 'المجموعة الثالثة (٧ - ٩ سنوات)',
    ageRangeEn: 'Group 3 (Ages 7-9)',
    promptAr: 'الهدوم معمولة من القماش، والكتب معمولة من ....',
    promptEn: 'Clothes are made of fabric, and books are made of ....',
    acceptedAnswers: ['الورق', 'ورق'],
    examinerCueAr: 'اقرأ بوضوح دون تلميح للإجابة.',
  },
  {
    key: 'l_38',
    itemNumber: 38,
    group: 3,
    ageRangeAr: 'المجموعة الثالثة (٧ - ٩ سنوات)',
    ageRangeEn: 'Group 3 (Ages 7-9)',
    promptAr: 'البقرة ناخد منها اللبن، والنحلة ناخد منها ....',
    promptEn: 'From the cow we get milk, and from the bee we get ....',
    acceptedAnswers: ['العسل', 'عسل'],
    examinerCueAr: 'اقرأ بوضوح دون تلميح للإجابة.',
  },
  {
    key: 'l_39',
    itemNumber: 39,
    group: 3,
    ageRangeAr: 'المجموعة الثالثة (٧ - ٩ سنوات)',
    ageRangeEn: 'Group 3 (Ages 7-9)',
    promptAr: 'الشتاء برد، والصيف ....',
    promptEn: 'Winter is cold, and summer is ....',
    acceptedAnswers: ['حر', 'سخن'],
    examinerCueAr: 'اقرأ بوضوح دون تلميح للإجابة.',
  },
  {
    key: 'l_40',
    itemNumber: 40,
    group: 3,
    ageRangeAr: 'المجموعة الثالثة (٧ - ٩ سنوات)',
    ageRangeEn: 'Group 3 (Ages 7-9)',
    promptAr: 'الكرسي معمول من الخشب، والمسمار معمول من ....',
    promptEn: 'The chair is made of wood, and the nail is made of ....',
    acceptedAnswers: ['الحديد', 'حديد'],
    examinerCueAr: 'اقرأ بوضوح دون تلميح للإجابة.',
  },
  {
    key: 'l_41',
    itemNumber: 41,
    group: 3,
    ageRangeAr: 'المجموعة الثالثة (٧ - ٩ سنوات)',
    ageRangeEn: 'Group 3 (Ages 7-9)',
    promptAr: 'الليل ظلمة، والنهار ....',
    promptEn: 'Night is dark, and day is ....',
    acceptedAnswers: ['نور', 'منور', 'ضوء'],
    examinerCueAr: 'اقرأ بوضوح دون تلميح للإجابة.',
  },
  {
    key: 'l_42',
    itemNumber: 42,
    group: 3,
    ageRangeAr: 'المجموعة الثالثة (٧ - ٩ سنوات)',
    ageRangeEn: 'Group 3 (Ages 7-9)',
    promptAr: 'القرش والجنيه فلوس، والذهب والفضة ....',
    promptEn: 'Piasters and pounds are money, and gold and silver are ....',
    acceptedAnswers: ['معدن', 'معادن', 'نلبسه', 'حلي', 'مجوهرات'],
    examinerCueAr: 'اقرأ بوضوح دون تلميح للإجابة.',
  },
  {
    key: 'l_43',
    itemNumber: 43,
    group: 3,
    ageRangeAr: 'المجموعة الثالثة (٧ - ٩ سنوات)',
    ageRangeEn: 'Group 3 (Ages 7-9)',
    promptAr: 'الذئب يكره الكلب، والفار يكره ....',
    promptEn: 'The wolf hates the dog, and the mouse hates the ....',
    acceptedAnswers: ['القط', 'القطة', 'قط'],
    examinerCueAr: 'اقرأ بوضوح دون تلميح للإجابة.',
  },
  {
    key: 'l_44',
    itemNumber: 44,
    group: 3,
    ageRangeAr: 'المجموعة الثالثة (٧ - ٩ سنوات)',
    ageRangeEn: 'Group 3 (Ages 7-9)',
    promptAr: 'يناير من شهور الشتاء، وأغسطس من شهور ....',
    promptEn: 'January is a winter month, and August is a month of ....',
    acceptedAnswers: ['الصيف', 'صيف'],
    examinerCueAr: 'اقرأ بوضوح دون تلميح للإجابة.',
  },
  {
    key: 'l_45',
    itemNumber: 45,
    group: 3,
    ageRangeAr: 'المجموعة الثالثة (٧ - ٩ سنوات)',
    ageRangeEn: 'Group 3 (Ages 7-9)',
    promptAr: 'القط والكلب حيوانات، والفرخة والبطة ....',
    promptEn: 'The cat and dog are animals, and the hen and duck are ....',
    acceptedAnswers: ['طيور', 'تطير'],
    examinerCueAr: 'اقرأ بوضوح دون تلميح للإجابة.',
  },
];

// Table 2: Normative Mental Ages (جدول 2 - معايير الأعمار العقلية)
export const MENTAL_AGE_NORMS_TABLE: Record<number, number> = {
  40: 48,
  41: 49,
  42: 49,
  43: 50,
  44: 50,
  45: 51,
  46: 51,
  47: 52,
  48: 53,
  49: 53,
  50: 54,
  51: 54,
  52: 55,
  53: 55,
  54: 56,
  55: 57,
  56: 58,
  57: 59,
  58: 60,
  59: 61,
  60: 63,
  61: 64,
  62: 66,
  63: 68,
  64: 70,
  65: 72,
  66: 74,
  67: 75,
  68: 77,
  69: 79,
  70: 81,
  71: 84,
  72: 87,
  73: 91,
  74: 95,
  75: 99,
  76: 102,
  77: 106,
  78: 108,
  79: 114,
  80: 117,
  81: 119,
  82: 122,
  83: 124,
  84: 126,
  85: 128,
  86: 130,
  87: 131,
  88: 132,
};

export interface MentalAgeLookupResult {
  mentalAgeMonths: number;
  years: number;
  months: number;
  isWithinNormTable: boolean;
  normNoteAr?: string;
  normNoteEn?: string;
}

export function lookupMentalAgeFromScore(totalRawScore: number): MentalAgeLookupResult {
  const clamped = Math.max(0, Math.min(90, Math.round(totalRawScore)));
  if (clamped in MENTAL_AGE_NORMS_TABLE) {
    const m = MENTAL_AGE_NORMS_TABLE[clamped];
    return {
      mentalAgeMonths: m,
      years: Math.floor(m / 12),
      months: m % 12,
      isWithinNormTable: true,
    };
  }
  if (clamped < 40) {
    // Proportional downward clinical estimate below Table 2 minimum (40 -> 48 months)
    const estimated = Math.max(24, Math.round(24 + (clamped / 40) * 24));
    return {
      mentalAgeMonths: estimated,
      years: Math.floor(estimated / 12),
      months: estimated % 12,
      isWithinNormTable: false,
      normNoteAr: 'الدرجة الخام أقل من الحد الأدنى في جدول المعايير (٤٠ درجة = ٤٨ شهراً)؛ تم احتساب تقدير إكلينيكي استرشادي.',
      normNoteEn: 'Raw score falls below the normative table minimum (40 = 48 months); an indicative clinical estimate is used.',
    };
  }
  // Above 88 (89 or 90)
  const estimated = 132 + (clamped - 88) * 2;
  return {
    mentalAgeMonths: estimated,
    years: Math.floor(estimated / 12),
    months: estimated % 12,
    isWithinNormTable: false,
    normNoteAr: 'الدرجة الخام تتجاوز سقف جدول المعايير (٨٨ درجة = ١٣٢ شهراً / ١١ سنة)؛ تم احتساب تقدير امتدادي.',
    normNoteEn: 'Raw score exceeds the normative table ceiling (88 = 132 months / 11 years); an extended estimate is used.',
  };
}

export interface ChronologicalAgeResult {
  years: number;
  months: number;
  days: number;
  totalMonths: number;
  isValid: boolean;
  errorAr?: string;
}

export function calculateChronologicalAge(birthDateStr: string, testDateStr: string): ChronologicalAgeResult {
  if (!birthDateStr || !testDateStr) {
    return { years: 0, months: 0, days: 0, totalMonths: 0, isValid: false };
  }
  const birth = new Date(birthDateStr + 'T00:00:00');
  const test = new Date(testDateStr + 'T00:00:00');
  if (Number.isNaN(birth.getTime()) || Number.isNaN(test.getTime())) {
    return { years: 0, months: 0, days: 0, totalMonths: 0, isValid: false, errorAr: 'صيغة التاريخ غير صالحة.' };
  }
  if (test < birth) {
    return {
      years: 0,
      months: 0,
      days: 0,
      totalMonths: 0,
      isValid: false,
      errorAr: 'تاريخ تطبيق الاختبار يجب أن يكون بعد تاريخ الميلاد.',
    };
  }

  let years = test.getFullYear() - birth.getFullYear();
  let months = test.getMonth() - birth.getMonth();
  let days = test.getDate() - birth.getDate();

  if (days < 0) {
    months -= 1;
    const prevMonthLastDay = new Date(test.getFullYear(), test.getMonth(), 0).getDate();
    days += prevMonthLastDay;
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }

  // Standard psychometric rounding: >= 15 days rounds up by 1 month
  const roundedExtraMonth = days >= 15 ? 1 : 0;
  let totalMonths = years * 12 + months + roundedExtraMonth;
  if (totalMonths < 12) {
    return {
      years,
      months,
      days,
      totalMonths,
      isValid: false,
      errorAr: 'عمر الطفل أقل من النطاق العمري المناسب للاختبار (٣ - ٩ سنوات).',
    };
  }

  const displayYears = Math.floor(totalMonths / 12);
  const displayMonths = totalMonths % 12;

  return {
    years: displayYears,
    months: displayMonths,
    days,
    totalMonths,
    isValid: true,
  };
}

export interface IQClassification {
  iq: number;
  labelAr: string;
  labelEn: string;
  tone: 'emerald' | 'sky' | 'amber' | 'rose';
  descriptionAr: string;
  descriptionEn: string;
}

export function calculateIQAndClassification(
  mentalAgeMonths: number,
  chronologicalAgeMonths: number
): IQClassification {
  const safeChrono = Math.max(12, chronologicalAgeMonths);
  const iq = Math.round((mentalAgeMonths / safeChrono) * 100);

  if (iq >= 130) {
    return {
      iq,
      labelAr: 'مرتفع جداً (متفوق عقلياً)',
      labelEn: 'Very Superior',
      tone: 'emerald',
      descriptionAr: 'أداء عقلي متميز يفوق المتوسط العمري بدرجة عالية في التمييز البصري والاستدلال اللفظي.',
      descriptionEn: 'Exceptional cognitive performance significantly above chronological age expectations.',
    };
  }
  if (iq >= 120) {
    return {
      iq,
      labelAr: 'ذكي جداً (مرتفع)',
      labelEn: 'Superior',
      tone: 'emerald',
      descriptionAr: 'قدرة عقلية عامة عالية وإدراك متقدم للعلاقات والمتعلقات.',
      descriptionEn: 'High overall intellectual ability and advanced relational reasoning.',
    };
  }
  if (iq >= 110) {
    return {
      iq,
      labelAr: 'فوق المتوسط',
      labelEn: 'High Average',
      tone: 'sky',
      descriptionAr: 'أداء يفوق المتوسط العام للفئة العمرية مع مؤشرات إيجابية للاستيعاب.',
      descriptionEn: 'Above-average cognitive functioning for chronological peers.',
    };
  }
  if (iq >= 90) {
    return {
      iq,
      labelAr: 'متوسط الذكاء (طبيعي)',
      labelEn: 'Average',
      tone: 'sky',
      descriptionAr: 'نمو عقلي متوازن ومناسب للمرحلة العمرية والصف الدراسي.',
      descriptionEn: 'Balanced, age-appropriate intellectual development within the normative average range.',
    };
  }
  if (iq >= 80) {
    return {
      iq,
      labelAr: 'دون المتوسط',
      labelEn: 'Low Average',
      tone: 'amber',
      descriptionAr: 'يحتاج إلى برامج إثراء تربوي وتدريب إضافي على المهارات المعرفية واللفظية.',
      descriptionEn: 'May benefit from targeted educational enrichment and guided cognitive practice.',
    };
  }
  if (iq >= 70) {
    return {
      iq,
      labelAr: 'حدي (بطيء التعلم)',
      labelEn: 'Borderline',
      tone: 'amber',
      descriptionAr: 'يُوصى بتدخل تربوي فردي ودعم متخصص في المهارات المفاهيمية واللغوية.',
      descriptionEn: 'Individualized psycho-educational support and structured skill scaffolding recommended.',
    };
  }
  return {
    iq,
    labelAr: 'منخفض (يحتاج تقييم ورعاية متخصصة)',
    labelEn: 'Below Normative Threshold',
    tone: 'rose',
    descriptionAr: 'انخفاض ملحوظ عن المعيار العمري يتطلب تقييماً إكلينيكياً شاملاً وخطط تربية خاصة.',
    descriptionEn: 'Significantly below chronological norms; comprehensive specialist evaluation and IEP planning advised.',
  };
}

export function normalizeArabicText(text: string): string {
  return text
    .trim()
    .replace(/[أإآ]/g, 'ا')
    .replace(/ى/g, 'ي')
    .replace(/ة/g, 'ه')
    .replace(/[\u064B-\u065F]/g, '')
    .toLowerCase();
}

export function matchesAcceptedVerbalAnswer(childAnswer: string, acceptedAnswers: string[]): boolean {
  const normInput = normalizeArabicText(childAnswer);
  if (!normInput) return false;
  return acceptedAnswers.some((ans) => {
    const normAns = normalizeArabicText(ans);
    return normInput === normAns || normInput.includes(normAns);
  });
}

export function formatMonthsToArabicYearsMonths(totalMonths: number): string {
  const y = Math.floor(totalMonths / 12);
  const m = totalMonths % 12;
  const yText = y === 1 ? 'سنة' : y === 2 ? 'سنتان' : y <= 10 ? `${y} سنوات` : `${y} سنة`;
  const mText = m === 0 ? '' : m === 1 ? 'وشهر واحد' : m === 2 ? 'وشهران' : m <= 10 ? `و${m} شهور` : `و${m} شهراً`;
  return `${yText} ${mText}`.trim();
}

export function formatMonthsToEnglishYearsMonths(totalMonths: number): string {
  const y = Math.floor(totalMonths / 12);
  const m = totalMonths % 12;
  return `${y}y ${m}m`;
}

export function isVisualOptionCorrect(item: VisualItem, selectedPosition: number): boolean {
  if (item.acceptedPositions && item.acceptedPositions.length > 0) {
    return item.acceptedPositions.includes(selectedPosition);
  }
  return selectedPosition === item.correctPosition;
}

/**
 * Inverts Dr. Eglal Serry's Table 2 (MENTAL_AGE_NORMS_TABLE) to find the expected
 * total raw score (out of 90) for a child performing at the normative average (IQ = 100, MA = CA).
 */
export function getExpectedNormativeRawScore(chronologicalAgeMonths: number): number {
  const ca = Math.max(24, Math.min(144, chronologicalAgeMonths));

  // Below Table 2 minimum (40 raw = 48 months)
  if (ca < 48) {
    return Math.max(4, Math.min(40, ((ca - 24) / 24) * 40));
  }

  // Above Table 2 maximum (88 raw = 132 months)
  if (ca >= 132) {
    return Math.min(90, 88 + (ca - 132) / 2);
  }

  const entries = Object.entries(MENTAL_AGE_NORMS_TABLE)
    .map(([raw, ma]) => ({ raw: Number(raw), ma }))
    .sort((a, b) => a.raw - b.raw);

  // Find exact or interpolated raw score where MA == CA
  let lower = entries[0];
  let upper = entries[entries.length - 1];

  for (let i = 0; i < entries.length; i++) {
    const curr = entries[i];
    if (curr.ma === ca) {
      // Average if multiple raw scores map to the same month
      let sum = curr.raw;
      let count = 1;
      while (i + 1 < entries.length && entries[i + 1].ma === ca) {
        i += 1;
        sum += entries[i].raw;
        count += 1;
      }
      return sum / count;
    }
    if (curr.ma < ca) {
      lower = curr;
    } else if (curr.ma > ca) {
      upper = curr;
      break;
    }
  }

  if (upper.ma === lower.ma) return lower.raw;
  const ratio = (ca - lower.ma) / (upper.ma - lower.ma);
  return lower.raw + ratio * (upper.raw - lower.raw);
}

export interface NormativeItemBand {
  bandIndex: number;
  startItem: number;
  endItem: number;
  group: 1 | 2 | 3;
  expectedPct: number;
  expectedItemsOutOf5: number;
}

export interface AgeNormativeProfile {
  expectedTotalRaw: number;
  expectedModalityRaw: number;
  itemBands: NormativeItemBand[];
  groupExpectedPct: {
    group1: number;
    group2: number;
    group3: number;
    total: number;
  };
}

/**
 * Distributes the Table-2 expected raw score across the 45 progressive items (ordered from
 * Group 1 ages 3-5 through Group 3 ages 7-9) using a calibrated logistic item-difficulty curve
 * whose exact sum equals expectedTotalRaw / 2 per modality.
 */
export function getAgeNormativeProfile(chronologicalAgeMonths: number): AgeNormativeProfile {
  const expectedTotalRaw = getExpectedNormativeRawScore(chronologicalAgeMonths);
  const expectedModalityRaw = Math.max(0.5, Math.min(44.8, expectedTotalRaw / 2));

  // Logistic item-characteristic curve across 45 ascending-difficulty items
  const scale = 0.24;
  const itemProb = (theta: number, itemIndexZeroBased: number) => {
    const difficulty = itemIndexZeroBased / 44; // 0.0 (item 1) -> 1.0 (item 45)
    return 1 / (1 + Math.exp(-(theta - difficulty) / scale));
  };

  // Binary search for ability parameter theta so sum of item probabilities == expectedModalityRaw
  let lo = -3.0;
  let hi = 4.0;
  for (let iter = 0; iter < 30; iter++) {
    const mid = (lo + hi) / 2;
    let sum = 0;
    for (let i = 0; i < 45; i++) {
      sum += itemProb(mid, i);
    }
    if (sum < expectedModalityRaw) {
      lo = mid;
    } else {
      hi = mid;
    }
  }
  const theta = (lo + hi) / 2;

  const itemProbs: number[] = [];
  for (let i = 0; i < 45; i++) {
    itemProbs.push(itemProb(theta, i));
  }

  const itemBands: NormativeItemBand[] = [];
  for (let b = 0; b < 9; b++) {
    const startIdx = b * 5;
    const bandSum = itemProbs.slice(startIdx, startIdx + 5).reduce((acc, v) => acc + v, 0);
    const group: 1 | 2 | 3 = b < 3 ? 1 : b < 6 ? 2 : 3;
    itemBands.push({
      bandIndex: b,
      startItem: startIdx + 1,
      endItem: startIdx + 5,
      group,
      expectedPct: Math.round((bandSum / 5) * 100),
      expectedItemsOutOf5: Number(bandSum.toFixed(1)),
    });
  }

  const g1Sum = itemProbs.slice(0, 15).reduce((a, v) => a + v, 0);
  const g2Sum = itemProbs.slice(15, 30).reduce((a, v) => a + v, 0);
  const g3Sum = itemProbs.slice(30, 45).reduce((a, v) => a + v, 0);

  return {
    expectedTotalRaw: Number(expectedTotalRaw.toFixed(1)),
    expectedModalityRaw: Number(expectedModalityRaw.toFixed(1)),
    itemBands,
    groupExpectedPct: {
      group1: Math.round((g1Sum / 15) * 100),
      group2: Math.round((g2Sum / 15) * 100),
      group3: Math.round((g3Sum / 15) * 100),
      total: Math.round((expectedTotalRaw / 90) * 100),
    },
  };
}


