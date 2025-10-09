<?php

namespace Database\Seeders;

use App\Infrastructure\Models\Page;
use App\Infrastructure\Models\PageSection;
use App\Infrastructure\Models\Media;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use Faker\Factory as Faker;

class CustomPageSeeder extends Seeder
{
  private $faker;

  public function __construct()
  {
    $this->faker = Faker::create();
  }

  public function run(): void
  {
    $allImages = Media::where('file_path', 'like', '%images%')->get();

    $pages = [
      'Mission & Vision' => [
        [
          'content_type' => 'HTML',
          'content' => '
                <div class="">
                    <div class="">
                        <h2 class="">Our Vision</h2>
                        <p class="mt-4">Our Vision is a second home for our children, where their growing needs are fulfilled in a safe, healthy, positive and creative environment and where their childhood will remain the happiest days of their lives.</p>
                    </div>
                    <div class="">
                        <h2 class="">Our Mission</h2>
                        <p class="mt-4">The Mission is to provide a creative environment conducive for the optimal growth and holistic development of children.</p>
                    </div>
                </div>'
        ]
      ],

      'Our Story' => [
        [
          'heading' => 'Our Story',
          'sub_heading' => 'How we started',
          'content_type' => 'HTML',
          'content' => '
                <section>
                    <div class="">
                        <p class="mb-4">At Dhaka Credit Child Care and Education Center, we are dedicated to fostering a nurturing and inclusive environment where every child feels secure, respected, and inspired to explore their full potential.</p>
                        <p class="mb-4">We recognize that each child is unique, and we collaborate closely with parents to tailor our programs to support curiosity, creativity, and meaningful social connections.</p>
                        <p class="">Our mission is to provide a creative environment conducive to the optimal growth and holistic development of children. We prioritize safety, health, and positivity, ensuring that our space is a place where children can thrive emotionally, socially, and academically.</p>
                    </div>
                </section>'
        ]
      ],

      'Our Philosophy' => [
        [
          'content_type' => 'HTML',
          'content' => '
                <div class="">
                    <div class="">
                        <h2 class="text-3xl font-semibold">Our Philosophy</h2>
                        <p class="mt-4">
                            We offer a quality child care programme which will stimulate a child’s natural creativity and at the same time provide an opportunity for healthy interaction with other children in a warm and caring environment...
                        </p>
                    </div>
                </div>'
        ]
      ],

      'President Message' => [
        [
          'heading' => 'Message from the President',
          'sub_heading' => 'A word from our leadership.',
          'content_type' => 'HTML',
          'content' => '
                <section class="president-message">
  <p>The Dhaka Credit Child Care and Education Centre (DCCCEC) is a place of comfort, safety, and growth for our beloved children. It is a long-cherished dream of The Christian Cooperative Credit Union Ltd., Dhaka, which proudly introduced the first-ever international-standard child care and education service in Bangladesh.</p>
  <p>Established in 2016, DCCCEC was founded to support working parents—especially new mothers—by providing a nurturing environment where children receive motherly care and high-quality early education. Our facilities were built under the supervision of a child care specialist from Singapore, ensuring international standards in both care and learning.</p>
  <p>Despite notable progress in early education across Bangladesh, working parents still face challenges finding reliable child care institutions. Dhaka Credit remains committed to expanding this essential service and making it accessible where it is most needed.</p>
  <p>We believe every child is our own. As a socio-economic organization, Dhaka Credit strives to create a society where parents can work confidently, knowing their children are safe, happy, and thriving. Our facilities—every floor, yard, and classroom—are designed to promote joyful learning and holistic development.</p>
  <p>We envision every child growing with love, sincerity, and respect for our nation and culture. With your continued support and trust, Dhaka Credit will keep fulfilling its social responsibility and contributing to the nation’s development.</p>
  <p><strong>Sincerely,</strong><br>
  <strong>Ignatious Hemanta Corraya</strong><br>
  <span>President</span><br>
  <span>The Christian Co-operative Credit Union Ltd., Dhaka</span></p>
</section>'
        ]
      ],

      'Principal Message' => [
        [
          'heading' => 'Principal’s Speech',
          'sub_heading' => 'Meet our principal.',
          'content_type' => 'HTML',
          'content' => '
                <section class="principal-speech">
  <p><em>“Children are like wet cement; whatever falls on them makes an impression.” — Haim Ginott</em></p>
  <p>Welcome to the DC Child Care and Education Centre! Early learning and child care build the foundation for a child’s educational and social development in a safe and nurturing environment—while supporting parents in their daily lives.</p>
  <p>As Principal, I am honoured to lead this centre where every day is a chance to learn, explore, and grow. For over two years, DC Child Care has been dedicated to providing high-quality care and education for children in a joyful, caring atmosphere.</p>
  <p>Our vision is to be a second home for every child—safe, healthy, positive, and creative—where childhood becomes the happiest time of life. We offer a holistic programme that nurtures creativity, encourages social interaction, and supports individual learning pace through thematic and integrated activities.</p>
  <p>We also emphasize health and nutrition, offering balanced meals and promoting good hygiene and healthy habits. Our goal is to raise children who are confident, compassionate, and ready for the future.</p>
  <p>In this ever-changing world of education, we embrace new technologies and teaching methods to engage children meaningfully and connect learning to real-life experiences. Beyond academics, we focus on developing integrity, empathy, resilience, and ethics—traits essential for lifelong success.</p>
  <p>We invite parents to visit, observe, and join hands with us in shaping young minds and hearts. Together, we can create a nurturing space where children flourish with happiness and purpose.</p>
  <p><strong>God bless you all!</strong><br>
  <strong>Thank you,</strong><br>
  <strong>Dalia M. Rodrigues</strong><br>
  <span>Principal</span></p>
</section>'
        ]
      ],

      'Child Care' => [
        [
          'heading' => 'Program Name',
          'sub_heading' => 'Caring for your little ones.',
          'content_type' => 'HTML',
          'content' => 'Our [Program Name] provides a safe, nurturing, and educational environment tailored to children’s developmental needs. Activities include hands-on learning, creative play, and social engagement, guided by trained professionals.',
          'button_text' => 'Learn More',
          'button_link' => '#',
        ]
      ],
      'Infant Care' => [
        [
          'heading' => 'Program Name', // e.g., 'Infant Care'
          'sub_heading' => 'Caring for your little ones.',
          'content_type' => 'HTML',
          'content' => 'Our [Program Name] provides a safe, nurturing, and educational environment tailored to children’s developmental needs. Activities include hands-on learning, creative play, and social engagement, guided by trained professionals.',
          'button_text' => 'Learn More',
          'button_link' => '#',
        ]
      ],
      'Toddler Program' => [
        [
          'heading' => 'Program Name', // e.g., 'Infant Care'
          'sub_heading' => 'Caring for your little ones.',
          'content_type' => 'HTML',
          'content' => 'Our [Program Name] provides a safe, nurturing, and educational environment tailored to children’s developmental needs. Activities include hands-on learning, creative play, and social engagement, guided by trained professionals.',
          'button_text' => 'Learn More',
          'button_link' => '#',
        ]
      ],
      'Preschool Program' => [
        [
          'heading' => 'Program Name', // e.g., 'Infant Care'
          'sub_heading' => 'Caring for your little ones.',
          'content_type' => 'HTML',
          'content' => 'Our [Program Name] provides a safe, nurturing, and educational environment tailored to children’s developmental needs. Activities include hands-on learning, creative play, and social engagement, guided by trained professionals.',
          'button_text' => 'Learn More',
          'button_link' => '#',
        ]
      ],
      'After-School Program' => [
        [
          'heading' => 'Program Name', // e.g., 'Infant Care'
          'sub_heading' => 'Caring for your little ones.',
          'content_type' => 'HTML',
          'content' => 'Our [Program Name] provides a safe, nurturing, and educational environment tailored to children’s developmental needs. Activities include hands-on learning, creative play, and social engagement, guided by trained professionals.',
          'button_text' => 'Learn More',
          'button_link' => '#',
        ]
      ],
      'Summer Camps' => [
        [
          'heading' => 'Program Name', // e.g., 'Infant Care'
          'sub_heading' => 'Caring for your little ones.',
          'content_type' => 'HTML',
          'content' => 'Our [Program Name] provides a safe, nurturing, and educational environment tailored to children’s developmental needs. Activities include hands-on learning, creative play, and social engagement, guided by trained professionals.',
          'button_text' => 'Learn More',
          'button_link' => '#',
        ]
      ],
      'Class Rutines' => [
        [
          'heading' => 'Daily Class Routines',
          'sub_heading' => 'A structured, joyful day.',
          'content_type' => 'HTML',
          'content' => 'Our daily routines balance learning and play. Children enjoy structured lessons, creative activities, outdoor play, and rest periods to ensure they thrive academically and emotionally.',
        ]
      ],

      // Parent Resources
      'Enrollment' => [
        [
          'content_type' => 'HTML',
          'content' => '
                    <div class="">
  <div class="">
    <h2 class="text-3xl font-semibold text-center">Registration &amp; Admission</h2>
    <div class="pt-8 leading-7">
      <p>
        <i class="fa-solid fa-check-double mr-[7px]"></i>
        In addition, copies of the following documents have to be submitted, and originals produced for verification:
      </p>

      <ul class="mt-2 font-semibold md:list-decimal md:ml-6">
        <li>Child birth certificate</li>
        <li>Both parents’ identity cards or NID</li>
      </ul>

      <p class="mt-4">
        The child will be admitted immediately upon registration. A trial period of up to two weeks is allowed,
        during which a child may be withdrawn and one-half of the monthly fees will be chargeable.
        The deposit and the balance of the monthly fees will be refunded in full.
        The registration fees are non-refundable.
      </p>

      <div class="mt-4">
        <p class="font-semibold underline text-deepBlue">Download necessary forms below</p>

        <a href="/assets/Enrollment Form-z6wwqMl1.pdf" download="Enrollment Form" target="_blank" rel="noreferrer">
          <button class="bg-primary px-6 py-2 rounded-[3px] font-semibold shadow-md hover:shadow-lg hover:bg-buttonAccent cursor-pointer my-4">
            <i class="fa-solid fa-file-arrow-down mr-[7px] text-[20px]"></i>
            Enrollment Form
          </button>
        </a>

        <a href="/assets/Authorization-cChuqm54.pdf" download="Authorization Form" target="_blank" rel="noreferrer">
          <button class="bg-primary px-6 py-2 rounded-[3px] font-semibold shadow-md hover:shadow-lg hover:bg-buttonAccent cursor-pointer lg:ml-4">
            <i class="fa-solid fa-file-arrow-down mr-[7px] text-[20px]"></i>
            Authorization Form
          </button>
        </a>
      </div>
    </div>

    <h2 class="mt-8 text-3xl font-semibold text-center">Termination of Service</h2>

    <div class="pt-8 leading-7">
      <p>
        <i class="fa-solid fa-check-double mr-[7px]"></i>
        The Centre reserves the right to terminate the service to any child by giving parents one month’s written notice, 
        should any of the following occur:
      </p>

      <ul class="mt-2 font-semibold md:list-disc md:ml-6">
        <li>Constant acts of violence (scratching, biting, fist fighting, kicking, etc.)</li>
        <li>Habitual late payment or non-payment of school fees</li>
        <li>Parents who do not abide by the Centre’s policies, rules, and regulations</li>
        <li>Child’s inability to adjust to the Centre</li>
      </ul>
    </div>

  </div>
</div>',
        ]
      ],
      'Curriculum' => [
        [
          'content_type' => 'HTML',
          'content' => '
                    <div class="">
  <div class="">

    <div>
      <h2 class="text-3xl font-semibold text-center">Our Curriculum</h2>

      <div class="mt-8 leading-8">
        <p>
          <span class="font-semibold">DC Child Care and Education Centre</span>
          runs an integrated programme organized by “Themes” in which learning happens through interdisciplinary activities.
          Integrated learning experiences help children make meaningful connections across learning areas and enable them
          to understand how knowledge and skills are linked. Our teachers provide meaningful content and context for learning
          based on the children’s culture, interests, and shared experiences.
          <br>
          The key knowledge, skills, and dispositions in our curriculum reflect a continuum of learning and development across
          different age groups for each learning area.
        </p>

        <div class="flex mt-4">
          <div class="mr-3">(a)</div>
          <div>
            <span class="font-semibold">LANGUAGE AND LITERACY (English and Bengali)</span>
            <p class="mt-1">
              Language and literacy are vital for children’s development in thinking and learning.
              Children need to use language not only to express their needs, feelings, and thoughts but also to make sense of
              what adults expect. Our teachers guide children to build vocabulary and engage in meaningful conversations.
              They play a vital role in language development, offering practice through listening and conversation.
            </p>
            <ul class="ml-12 list-disc">
              <li>Valuing children’s talk by taking time to listen and respond</li>
              <li>Stimulating verbal interactions between children</li>
              <li>Encouraging children to record their ideas and thoughts</li>
            </ul>
            <p class="mt-1">
              Teachers develop language and literacy through rhymes, songs, language games, role-play, storytelling,
              shared reading, alphabet activities, and writing exercises.
            </p>
          </div>
        </div>

        <div class="flex mt-4">
          <div class="mr-3">(b)</div>
          <div>
            <span class="font-semibold">NUMERACY</span>
            <p class="mt-1">
              Numeracy development involves understanding numbers and applying them meaningfully in real life situations.
              Using manipulatives, pictures, and symbols, children learn counting, sharing, and representing quantities.
              Activities focus on hands-on experiences and using appropriate language like position words, number names, and shapes.
            </p>
            <p class="mt-1">
              Numeracy experiences build on what children already know, following a progressive learning order that includes:
            </p>
            <ul class="ml-12 list-disc">
              <li>Matching, sorting, and comparing</li>
              <li>Ordering and patterning</li>
              <li>Counting and number value</li>
              <li>Shape and spatial awareness</li>
              <li>Simple measurement</li>
            </ul>
            <p class="mt-1">
              To become numerate, children engage in:
            </p>
            <ul class="ml-12 list-disc">
              <li><strong>Problem-solving</strong> – exploring multiple ways to solve problems</li>
              <li><strong>Communication</strong> – expressing ideas using words, pictures, and symbols</li>
              <li><strong>Reasoning</strong> – explaining their thought process and proof</li>
              <li><strong>Connection</strong> – discovering relationships within numeracy and other subjects</li>
              <li><strong>Representation</strong> – using pictures, graphs, and symbols to present information</li>
            </ul>
          </div>
        </div>

        <div class="flex mt-4">
          <div class="mr-3">(c)</div>
          <div>
            <span class="font-semibold">MOTOR SKILL</span>
            <p class="mt-1">
              Our motor skill programme includes gross motor skills, fine motor skills, physical fitness, health, and safety.
              We plan regular and safe physical activities that enhance coordination, fitness, and self-help routines.
              Group games teach cooperation, sharing, and turn-taking, while helping children develop awareness of safety.
            </p>
          </div>
        </div>

        <div class="flex mt-4">
          <div class="mr-3">(d)</div>
          <div>
            <span class="font-semibold">AESTHETICS AND CREATIVE EXPRESSION</span>
            <p class="mt-1">
              <span class="font-semibold">DC Child Care and Education Centre</span> provides experiences in visual arts,
              music, and movement, encouraging creativity and imagination. Involvement in the arts stimulates children’s
              senses and enhances learning. These experiences help children:
            </p>
            <ul class="ml-12 list-disc">
              <li>Express ideas and feelings about themselves and the world</li>
              <li>Gain confidence in communicating and expressing themselves</li>
              <li>Be resourceful and try new approaches</li>
              <li>Develop critical thinking and express opinions</li>
            </ul>
          </div>
        </div>

        <div class="flex mt-4">
          <div class="mr-3">(e)</div>
          <div>
            <span class="font-semibold">DISCOVERY OF THE WORLD</span>
            <p class="mt-1">
              This area helps children understand the world, laying foundations for science, history, and geography.
              Learning happens through sensory exploration, investigations, and hands-on experiences.
              <span class="font-semibold">DC Child Care and Education Centre</span> nurtures a sense of wonder and curiosity.
            </p>
            <ul class="ml-12 list-disc">
              <li>Extend natural curiosity</li>
              <li>Discover and experiment independently</li>
              <li>Build on existing knowledge</li>
              <li>Develop reasoning and explanation skills</li>
              <li>Foster care and appreciation for the environment</li>
            </ul>
            <p class="mt-1">
              Children explore through investigations, expert visits, and field trips using observation, comparison, classification,
              recording, prediction, and reporting skills.
            </p>
          </div>
        </div>

        <div class="flex mt-4">
          <div class="mr-3">(f)</div>
          <div>
            <span class="font-semibold">SOCIAL EMOTIONAL DEVELOPMENT</span>
            <p class="mt-1">
              We guide children toward self and social awareness through daily interactions and teachable moments that highlight
              positive social behavior. 
              <br>
              <span class="font-semibold">DC Child Care and Education Centre</span> helps children:
            </p>
            <ul class="ml-12 list-disc">
              <li>Develop self-awareness and self-management for personal well-being</li>
              <li>Build social awareness and healthy relationships</li>
              <li>Make responsible decisions and act on them</li>
            </ul>
          </div>
        </div>

        <div class="mt-4">
          <p class="mt-1">
            Our teachers develop children’s social and emotional competence through:
          </p>
          <ul class="ml-12 list-disc">
            <li>Setting classroom rules and routines</li>
            <li>Building strong and positive relationships with children</li>
            <li>Encouraging honest and respectful emotional expression</li>
            <li>Teaching moral lessons about right and wrong</li>
            <li>Modeling positive behavior in speech and action</li>
          </ul>
        </div>

      </div>
    </div>

  </div>
</div>
                    ',
        ]
      ],
      'Rules & Regulations' => [
        [
          'content_type' => 'HTML',
          'content' => '
                    <div class="">
  <div class="">
    <h1 class="text-3xl font-semibold text-center">Rules and Regulation</h1>
    <div class="pt-8 leading-7">
      <ul class="ml-6">
        <li class="flex [&:not(:first-child)]:pt-[16px]">
          <i class="fa-solid fa-angles-right mt-[5px] mr-[13px] text-[1.2rem]"></i>
          <span>Each child should put on a fresh set of uniform upon arrival at the Centre.</span>
        </li>
        <li class="flex [&:not(:first-child)]:pt-[16px]">
          <i class="fa-solid fa-angles-right mt-[5px] mr-[13px] text-[1.2rem]"></i>
          <span>All belongings of the child should be clearly labelled. If your child is not toilet trained, please have him/her put on diapers/training pants and pack a spare or two in his/her bag.</span>
        </li>
        <li class="flex [&:not(:first-child)]:pt-[16px]">
          <i class="fa-solid fa-angles-right mt-[5px] mr-[13px] text-[1.2rem]"></i>
          <span>Medication will only be administrated upon the submission of a properly completed Medicine Administration.</span>
        </li>
        <li class="flex [&:not(:first-child)]:pt-[16px]">
          <i class="fa-solid fa-angles-right mt-[5px] mr-[13px] text-[1.2rem]"></i>
          <span>Parents and visitors are not permitted to enter the kitchen area and handle food or utensils used by the children in the Centre.</span>
        </li>
        <li class="flex [&:not(:first-child)]:pt-[16px]">
          <i class="fa-solid fa-angles-right mt-[5px] mr-[13px] text-[1.2rem]"></i>
          <span>In order to protect the privacy of the children in the Centre, the children’s bathroom and toilets are strictly out of bounds to parents and visitors during bathing time.</span>
        </li>
        <li class="flex [&:not(:first-child)]:pt-[16px]">
          <i class="fa-solid fa-angles-right mt-[5px] mr-[13px] text-[1.2rem]"></i>
          <span>Parents who wish to visit their children during school hours need to seek permission from the Centre Principal. Frequent or long visits causing disruption to routine will not be permitted.</span>
        </li>
        <li class="flex [&:not(:first-child)]:pt-[16px]">
          <i class="fa-solid fa-angles-right mt-[5px] mr-[13px] text-[1.2rem]"></i>
          <span>Monthly fees should be paid in advance, no later than the 10th day of the month. A penalty of Tk. 100/= applies for late payment per occurrence.</span>
        </li>
        <li class="flex [&:not(:first-child)]:pt-[16px]">
          <i class="fa-solid fa-angles-right mt-[5px] mr-[13px] text-[1.2rem]"></i>
          <span>Parents or an authorized person must sign in/out their child.</span>
        </li>
        <li class="flex [&:not(:first-child)]:pt-[16px]">
          <i class="fa-solid fa-angles-right mt-[5px] mr-[13px] text-[1.2rem]"></i>
          <span>A late pick-up penalty of Tk. 50/= for every 5 minutes or part thereof beyond 7:00pm will be charged.</span>
        </li>
        <li class="flex [&:not(:first-child)]:pt-[16px]">
          <i class="fa-solid fa-angles-right mt-[5px] mr-[13px] text-[1.2rem]"></i>
          <span>All field trip and excursion fees, except meals, shall be borne separately by the parents.</span>
        </li>
        <li class="flex [&:not(:first-child)]:pt-[16px]">
          <i class="fa-solid fa-angles-right mt-[5px] mr-[13px] text-[1.2rem]"></i>
          <span>Parents must sign a consent form for each field trip or excursion.</span>
        </li>
        <li class="flex [&:not(:first-child)]:pt-[16px]">
          <i class="fa-solid fa-angles-right mt-[5px] mr-[13px] text-[1.2rem]"></i>
          <span>The management reserves the right to amend any handbook rules or regulations with one month’s notice.</span>
        </li>
      </ul>
    </div>
    <div class="pt-8 leading-7">
      <h1 class="text-2xl font-semibold text-center">DC CHILD CARE AND EDUCATION CENTRE APPROVED FORMAL UNIFORM</h1>
      <p class="pt-4 leading-7">
        To be worn as a complete uniform. No mix and match with the Standard Uniform and only as specified by DC Child Care and Education Centre.
        Any alterations to the garments must not compromise style, design, or length.
      </p>
      <div class="pt-4 leading-7 text-center">
        <table border="1" cellspacing="0" cellpadding="0" class="px-2 py-1 mx-auto border border-black">
          <tr class="px-2 py-1 border border-black bg-primary">
            <td width="157" valign="top"><p>&nbsp;</p></td>
            <td width="534" valign="top" class="px-2 py-1 border border-black"><p>Boys</p></td>
            <td width="547" valign="top" class="px-2 py-1 border border-black"><p>Girls</p></td>
          </tr>
          <tr class="px-2 py-1 border border-black bg-accent">
            <td width="157" valign="top" class="px-2 py-1 border border-black"><p>Formal</p></td>
            <td width="234" valign="top">
              <p>Navy Blue shorts/trousers<br>Sky Blue shirt</p>
              <p>Navy Blue Jumper<br>Plain socks (white)<br>Shoes (black)</p>
            </td>
            <td width="247" valign="top" class="px-2 py-1 border border-black">
              <p>Navy Blue skirt<br>Sky Blue blouse</p>
              <p>Navy Blue cardigan<br>Plain socks/tights (white)<br>Shoes (black)</p>
            </td>
          </tr>
          <tr class="bg-secondary">
            <td width="157" valign="top"><p>T-shirt</p></td>
            <td width="234" valign="top" class="px-2 py-1 border border-black"><p>Black shorts/trousers<br>Orange T-shirt</p></td>
            <td width="247" valign="top" class="px-2 py-1 border border-black"><p>Black shorts/trousers<br>Orange T-shirt</p></td>
          </tr>
        </table>
      </div>
      <h2 class="pt-8 text-2xl font-semibold">
        <i class="mr-1 text-2xl fa-solid fa-circle-info"></i> General uniform information and rules of appearance:
      </h2>
      <ul class="pt-2 leading-7">
        <li><i class="fa-solid fa-angles-right mt-[5px] mr-[13px] text-[1.2rem]"></i>Pupils should be well presented at all times and show pride in their appearance.</li>
        <li><i class="fa-solid fa-angles-right mt-[5px] mr-[13px] text-[1.2rem]"></i>They should always come to school in the appropriate uniform, with shoes clean and polished.</li>
        <li><i class="fa-solid fa-angles-right mt-[5px] mr-[13px] text-[1.2rem]"></i>All clothing, shoes, and other items brought to school MUST be clearly labeled.</li>
        <li><i class="fa-solid fa-angles-right mt-[5px] mr-[13px] text-[1.2rem]"></i>Each child must have a named water bottle to refill throughout the day and take home at the end of the day.</li>
      </ul>
    </div>
    <div class="pt-8 leading-7">
      <h2 class="text-2xl font-semibold">
        <i class="mr-1 text-2xl fa-solid fa-circle-info"></i> Arrival and Pick-up
      </h2>
      <p class="mt-4">
        All children should be sent to and picked up from the Centre by either the parents or an authorized adult who must sign in/out the child at the reception area and stay until a staff member takes charge.
      </p>
      <p class="mt-2">
        Parents are encouraged to send children early to avoid missing lessons and activities. If the authorized person is unable to pick up the child, parents must inform the Centre and provide details of an alternative authorized person.
      </p>
    </div>
    <div class="pt-8 leading-7">
      <h2 class="text-2xl font-semibold">
        <i class="mr-1 text-2xl fa-solid fa-circle-info"></i> Attendance and Absence
      </h2>
      <p class="mt-4">
        A daily programme is displayed at the reception area for parent information. Regular attendance is necessary to fully benefit from the programme. Please inform the Centre by telephone if your child is absent, stating the reason.
      </p>
    </div>
  </div>
</div>
                    ',
        ]
      ],
      'Health & Safety' => [
        [
          'content_type' => 'HTML',
          'content' => '
                    <div class="">
  <div class="">
    <div>
      <h2 class="text-3xl font-semibold text-center">Our Environment</h2>
      <p class="mt-4 leading-7">
        We accommodate individual pace of learning and development through our thematic and integrated programme. 
        We are committed to being a health-promoting school and provide a well-balanced nutritional programme, 
        which lays the foundation for the healthy physical growth of children. 
        We actively promote a healthy lifestyle and encourage children to adopt healthy habits and good hygiene practices. 
        We strive to provide holistic education and care in a safe and respectful environment, empowering each child 
        to become a curious learner and confident speaker, anchored in strong character to guide and prepare them to serve the community. 
        Parent education seminars will also be conducted to inform parents on the latest developments in early childhood education and enhance their parenting skills.
      </p>
    </div>
    <div class="mt-8">
      <h2 class="text-3xl font-semibold text-center">Our Staff</h2>
      <p class="mt-4 leading-7">
        We believe that "when we stop learning, we stop teaching." Our teachers undergo extensive training to embody and deliver the curriculum, 
        and undergo accreditation to ensure they are fully equipped to nurture our young champs. 
        Our preschool teachers are trained to ensure your child is cared for by the most qualified and dedicated educators. 
        Besides you and your family, our child educators spend the most time with your child during the day. 
        You can rest assured that our educators are trained to use every opportunity for the healthy emotional development of children in their care. 
        To help children develop the ability to regulate their emotions, our teachers are trained to pick up emotional cues and convert negative emotions into positive ones.
      </p>
    </div>
  </div>
</div>
                    ',
        ]
      ],
      'Calendar' => [],
      'Nutrition & Meals' => [
        [
          'content_type' => 'HTML',
          'content' => '
                    <div class="">
  <div class="">

    <h1 class="text-3xl font-semibold text-center">Nutrition</h1>

    <div class="pt-8 leading-7">

      <div class="pb-6 rounded-md">
        <p class="leading-7">
          The Centre provides a healthy and balanced diet (without pork or beef) for the nourishment of the children under its charge. 
          A weekly menu is displayed at the reception area.
        </p>
        <p class="pt-4 leading-7">
          Parents with children who have special dietary requirements are to indicate these in the Registration Form 
          and highlight them during admission to the Supervisor.
        </p>
        <p class="pt-4 leading-7">
          Children are discouraged from bringing other food or snacks, except on special occasions and subject to prior notification.
        </p>
      </div>
    </div>

  </div>
</div>
                    ',
        ]
      ],
      'FAQ' => [
        [
          'heading' => 'Frequently Asked Questions',
          'sub_heading' => 'Find your answers here',
          'content_type' => 'HTML',
          'content' => '',
          'json_array' => [
            ['question' => 'What are your school hours?', 'answer' => 'We operate from 8:00 AM to 3:00 PM.'],
            ['question' => 'Do you offer transportation?', 'answer' => 'Yes, bus services are available.'],
            ['question' => 'What are the school fees?', 'answer' => 'The school fees depend on the program you choose.'],
            ['question' => 'What are the school policies?', 'answer' => 'Please refer to our website for the latest school policies.'],
            ['question' => 'Do you offer scholarships?', 'answer' => 'Yes, we offer scholarships to eligible students.'],
            ['question' => 'What are the school policies?', 'answer' => 'Please refer to our website for the latest school policies.'],
          ]
        ]
      ],

      // Legal
      'Disclaimer' => [
        [
          'heading' => 'Page Title', // e.g., 'Privacy Policy'
          'sub_heading' => 'Important legal information.',
          'content_type' => 'HTML',
          'content' => 'Please read this page carefully to understand our policies and your rights. Our goal is transparency and accountability in all aspects of our child care and education services.',
        ]
      ],
      'Terms of Service' => [
        [
          'heading' => 'Page Title', // e.g., 'Privacy Policy'
          'sub_heading' => 'Important legal information.',
          'content_type' => 'HTML',
          'content' => 'Please read this page carefully to understand our policies and your rights. Our goal is transparency and accountability in all aspects of our child care and education services.',
        ]
      ],
      'Privacy Policy' => [
        [
          'heading' => 'Page Title', // e.g., 'Privacy Policy'
          'sub_heading' => 'Important legal information.',
          'content_type' => 'HTML',
          'content' => 'Please read this page carefully to understand our policies and your rights. Our goal is transparency and accountability in all aspects of our child care and education services.',
        ]
      ],
    ];

    foreach ($pages as $title => $sections) {
      $slug = Str::slug($title);

      $page = Page::firstOrCreate(
        ['slug' => $slug],
        [
          'title' => $title,
          'meta_title' => $title,
          'meta_description' => "{$title} page description",
          'meta_keywords' => Str::lower(str_replace(' ', ',', $title)),
          'media_id' => $allImages->random()->id ?? null,
        ]
      );

      foreach ($sections as $index => $section) {
        PageSection::updateOrCreate(
          [
            'page_id' => $page->id,
            'sort_order' => $index + 1,
          ],
          [
            'heading' => $section['heading'] ?? null,
            'sub_heading' => $section['sub_heading'] ?? null,
            'content_type' => $section['content_type'] ?? 'TEXT',
            'content' => $section['content'] ?? $this->faker->paragraph(3),
            'json_array' => json_encode($section['json_array'] ?? []),
            'gallery' => json_encode($section['gallery'] ?? []),
            'button_text' => $section['button_text'] ?? null,
            'button_link' => $section['button_link'] ?? null,
            'media_id' => $allImages->random()->id ?? null,
          ]
        );
      }
    }
  }
}
