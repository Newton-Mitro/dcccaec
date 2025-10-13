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
          'excerpt' => 'At Dhaka Credit Child Care and Education Center, we nurture every child in a safe, inclusive, and inspiring environment. Recognizing each child’s uniqueness, we work closely with parents to create programs that spark curiosity, creativity, and meaningful social connections. Our mission is to provide a supportive space that promotes holistic growth, helping children thrive emotionally, socially, and academically, while prioritizing safety, health, and positivity.',
          'heading' => 'Our Story',
          'sub_heading' => 'How we started',
          'content_type' => 'HTML',
          'content' => '
                <section>
                    <div class="">
                        <p class="mb-4">At <strong>Dhaka Credit Child Care and Education Center</strong>, we are dedicated to fostering a nurturing and inclusive environment where every child feels secure, respected, and inspired to explore their full potential.</p>
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
      'Class Rutines' => [
        [
          'heading' => 'Daily Class Routines',
          'sub_heading' => 'A structured, joyful day.',
          'content_type' => 'HTML',
          'content' => '<section id="class-routines" class="">
  <div class="container mx-auto px-4 sm:px-6 lg:px-8">
    <h2 class="text-3xl font-bold mb-8">Daily Class Routines</h2>

    <p class="mb-6">
      At Dhaka Credit Child Care and Education Center, we follow a structured and balanced daily routine to ensure children enjoy a blend of learning, play, and rest. Our schedules are designed to promote holistic development—academically, socially, and emotionally.
    </p>

    <h3 class="text-xl font-semibold mb-3">Sample Daily Schedule</h3>
    <table class="w-full border border-gray-300 text-left mb-6">
      <thead>
        <tr class="bg-gray-200">
          <th class="px-4 py-2 border">Time</th>
          <th class="px-4 py-2 border">Activity</th>
        </tr>
      </thead>
      <tbody>
        <tr class="even:">
          <td class="px-4 py-2 border">08:00 - 08:30</td>
          <td class="px-4 py-2 border">Arrival & Morning Greetings</td>
        </tr>
        <tr class="even:">
          <td class="px-4 py-2 border">08:30 - 09:30</td>
          <td class="px-4 py-2 border">Learning Circle / Thematic Lessons</td>
        </tr>
        <tr class="even:">
          <td class="px-4 py-2 border">09:30 - 10:00</td>
          <td class="px-4 py-2 border">Snack Time / Social Interaction</td>
        </tr>
        <tr class="even:">
          <td class="px-4 py-2 border">10:00 - 11:00</td>
          <td class="px-4 py-2 border">Creative Activities (Art, Music, Movement)</td>
        </tr>
        <tr class="even:">
          <td class="px-4 py-2 border">11:00 - 11:30</td>
          <td class="px-4 py-2 border">Outdoor Play / Physical Activities</td>
        </tr>
        <tr class="even:">
          <td class="px-4 py-2 border">11:30 - 12:00</td>
          <td class="px-4 py-2 border">Storytelling / Language Development</td>
        </tr>
        <tr class="even:">
          <td class="px-4 py-2 border">12:00 - 12:30</td>
          <td class="px-4 py-2 border">Lunch & Hygiene Routine</td>
        </tr>
        <tr class="even:">
          <td class="px-4 py-2 border">12:30 - 01:30</td>
          <td class="px-4 py-2 border">Rest / Nap Time</td>
        </tr>
        <tr class="even:">
          <td class="px-4 py-2 border">01:30 - 02:30</td>
          <td class="px-4 py-2 border">Hands-On Learning / Cognitive Activities</td>
        </tr>
        <tr class="even:">
          <td class="px-4 py-2 border">02:30 - 03:00</td>
          <td class="px-4 py-2 border">Closing Circle / Reflection & Goodbye</td>
        </tr>
      </tbody>
    </table>

    <p class="mb-4">
      Activities may vary depending on the age group and learning theme of the day. Our routines are designed to balance structured learning with free play, physical activity, creativity, and social interaction.
    </p>

    <p class="mb-4">
      We ensure that every child experiences a joyful, safe, and engaging day that promotes curiosity, emotional growth, and cognitive development.
    </p>
  </div>
</section>
',
        ]
      ],

      // Parent Resources
      'Enrollment' => [
        [
          'content_type' => 'HTML',
          'content' => '<section id="enrollment" class="">
  <div class="container mx-auto px-4 sm:px-6 lg:px-8">
    <h2 class="text-3xl font-bold mb-8">Registration & Admission</h2>

    <p class="mb-4">
      To enroll your child at <strong>Dhaka Credit Child Care and Education Center</strong>, please submit the required documents and ensure originals are available for verification:
    </p>
    
    <ul class="list-decimal list-inside mb-6 font-semibold">
      <li>Child’s birth certificate</li>
      <li>Both parents’ identity cards or NID</li>
    </ul>

    <p class="mb-6">
      Admission will be processed immediately upon registration. A trial period of up to two weeks is allowed, during which one-half of the monthly fees may be charged if the child is withdrawn. Registration fees are non-refundable.
    </p>

    <div class="flex flex-col sm:flex-row gap-4 justify-center mb-12">
      <a href="/assets/Enrollment Form-z6wwqMl1.pdf" download="Enrollment Form" target="_blank" class="bg-primary text-white px-6 py-3 rounded shadow hover:bg-blue-700 transition">
        <i class="fa-solid fa-file-arrow-down mr-2"></i>Enrollment Form
      </a>
      <a href="/assets/Authorization-cChuqm54.pdf" download="Authorization Form" target="_blank" class="bg-primary text-white px-6 py-3 rounded shadow hover:bg-blue-700 transition">
        <i class="fa-solid fa-file-arrow-down mr-2"></i>Authorization Form
      </a>
    </div>

    <h3 class="text-2xl font-semibold mb-4">Termination of Service</h3>
    <p class="mb-4">
      The Centre reserves the right to terminate service to any child by giving parents one month’s written notice in the following cases:
    </p>

    <ul class="list-disc list-inside font-semibold">
      <li>Constant acts of violence (scratching, biting, fist fighting, kicking, etc.)</li>
      <li>Habitual late payment or non-payment of school fees</li>
      <li>Non-compliance with Centre policies, rules, and regulations</li>
      <li>Child’s inability to adjust to the Centre environment</li>
    </ul>
  </div>
</section>
',
        ]
      ],
      'Curriculum' => [
        [
          'content_type' => 'HTML',
          'content' => '<section id="curriculum" class="">
  <div class="container mx-auto px-4 sm:px-6 lg:px-8">
    <h2 class="text-3xl font-bold mb-8">Our Curriculum</h2>
    
    <p class="mb-6">
      At <strong>Dhaka Credit Child Care and Education Center</strong>, we follow an integrated, thematic curriculum designed to stimulate children’s curiosity, creativity, and love of learning. Our programs emphasize holistic growth, combining cognitive, social, emotional, and physical development.
    </p>

    <!-- Language & Literacy -->
    <div class="mb-8">
      <h3 class="text-2xl font-semibold mb-2">Language & Literacy (English and Bengali)</h3>
      <p class="mb-2">
        Language and literacy are vital for children’s thinking and learning. Children learn to communicate, express their needs, and engage in meaningful conversations.
      </p>
      <ul class="list-disc ml-6">
        <li>Encouraging storytelling, songs, rhymes, and role-play</li>
        <li>Building vocabulary and conversational skills</li>
        <li>Engaging in early reading and writing activities</li>
      </ul>
    </div>

    <!-- Numeracy -->
    <div class="mb-8">
      <h3 class="text-2xl font-semibold mb-2">Numeracy</h3>
      <p class="mb-2">
        Numeracy development involves understanding numbers and applying them in real-life situations. Hands-on activities help children grasp counting, patterns, shapes, and measurements.
      </p>
      <ul class="list-disc ml-6">
        <li>Sorting, matching, and comparing objects</li>
        <li>Recognizing numbers and patterns</li>
        <li>Problem-solving and reasoning activities</li>
      </ul>
    </div>

    <!-- Motor Skills -->
    <div class="mb-8">
      <h3 class="text-2xl font-semibold mb-2">Motor Skills</h3>
      <p>
        We develop both gross and fine motor skills through physical activities, exercises, and creative play. Children learn coordination, strength, and healthy habits while engaging in fun games and routines.
      </p>
    </div>

    <!-- Creative Arts -->
    <div class="mb-8">
      <h3 class="text-2xl font-semibold mb-2">Aesthetics & Creative Expression</h3>
      <p class="mb-2">
        Visual arts, music, and movement activities nurture creativity, self-expression, and confidence.
      </p>
      <ul class="list-disc ml-6">
        <li>Painting, drawing, and craft activities</li>
        <li>Music, dance, and rhythm exercises</li>
        <li>Role-play and imaginative storytelling</li>
      </ul>
    </div>

    <!-- Discovery of the World -->
    <div class="mb-8">
      <h3 class="text-2xl font-semibold mb-2">Discovery of the World</h3>
      <p class="mb-2">
        Children explore the world around them through sensory activities, hands-on investigations, and outdoor learning.
      </p>
      <ul class="list-disc ml-6">
        <li>Science, history, and geography experiences</li>
        <li>Observation, exploration, and experimentation</li>
        <li>Field trips and expert visits</li>
      </ul>
    </div>

    <!-- Social & Emotional Development -->
    <div class="mb-8">
      <h3 class="text-2xl font-semibold mb-2">Social & Emotional Development</h3>
      <p class="mb-2">
        Children develop self-awareness, social skills, and emotional intelligence through guided interactions and daily routines.
      </p>
      <ul class="list-disc ml-6">
        <li>Building relationships and empathy</li>
        <li>Understanding rules and responsibilities</li>
        <li>Problem-solving and conflict resolution</li>
      </ul>
    </div>

    <p class="mt-6 text-center font-semibold">
      Our curriculum is carefully designed to ensure every child thrives academically, socially, emotionally, and physically in a safe, nurturing environment.
    </p>
  </div>
</section>
',
        ]
      ],
      'Rules & Regulations' => [
        [
          'content_type' => 'HTML',
          'content' => '<section id="rules-regulations" class="">
  <div class="container mx-auto px-4 sm:px-6 lg:px-8">
    <h2 class="text-3xl font-bold mb-8">Rules & Regulations</h2>

    <h3 class="text-xl font-semibold mt-6 mb-2">General Conduct</h3>
    <ul class="list-disc list-inside mb-4">
      <li>Each child should arrive in proper uniform, clean and presentable.</li>
      <li>All personal belongings should be clearly labeled with the child’s name.</li>
      <li>Children who are not toilet-trained must have diapers or training pants, along with spare items in their bag.</li>
      <li>Parents and visitors are not allowed in the kitchen or food handling areas.</li>
      <li>Children’s bathrooms are off-limits to parents and visitors during bathing times.</li>
    </ul>

    <h3 class="text-xl font-semibold mt-6 mb-2">Attendance & Punctuality</h3>
    <ul class="list-disc list-inside mb-4">
      <li>Parents or authorized adults must sign children in and out at the reception area.</li>
      <li>Late pickups will incur a penalty of Tk. 50 for every 5 minutes beyond the designated time.</li>
      <li>Regular attendance is encouraged to ensure children benefit fully from the program.</li>
    </ul>

    <h3 class="text-xl font-semibold mt-6 mb-2">Fees & Payments</h3>
    <ul class="list-disc list-inside mb-4">
      <li>Monthly fees must be paid in advance, no later than the 10th of each month.</li>
      <li>A penalty of Tk. 100 applies for late payments.</li>
      <li>Field trip or excursion fees, except meals, are to be borne separately by parents.</li>
    </ul>

    <h3 class="text-xl font-semibold mt-6 mb-2">Health & Safety</h3>
    <ul class="list-disc list-inside mb-4">
      <li>Medication will only be administered upon submission of a properly completed Medicine Administration form.</li>
      <li>Children should be sent to the center in good health. Please inform the staff if your child is unwell.</li>
      <li>Emergency contact information must be kept up-to-date at all times.</li>
    </ul>

    <h3 class="text-xl font-semibold mt-6 mb-2">Behavior & Discipline</h3>
    <ul class="list-disc list-inside mb-4">
      <li>Children are expected to follow classroom rules and respect staff and peers.</li>
      <li>Constant acts of violence or disruptive behavior may result in termination of service with one month’s notice.</li>
      <li>Parents are encouraged to collaborate with staff in addressing behavioral issues.</li>
    </ul>

    <h3 class="text-xl font-semibold mt-6 mb-2">Uniform Guidelines</h3>
    <p class="mb-4">
      All children are required to wear the prescribed uniform. Uniforms must be clean, complete, and worn as specified by the center. Shoes should be clean and appropriate for indoor and outdoor activities.
    </p>

    <h3 class="text-xl font-semibold mt-6 mb-2">Parental Responsibility</h3>
    <ul class="list-disc list-inside mb-4">
      <li>Parents must provide necessary documentation, including the child’s birth certificate and parental ID/NID during registration.</li>
      <li>Parents should notify the center if an authorized adult other than themselves will pick up their child.</li>
      <li>Frequent or extended visits that disrupt the daily routine are not allowed.</li>
    </ul>

    <h3 class="text-xl font-semibold mt-6 mb-2">Policy Updates</h3>
    <p>
      The management reserves the right to update or modify any rules and regulations with prior notice. Parents will be informed of any changes in writing.
    </p>
  </div>
</section>
',
        ]
      ],
      'Health & Safety' => [
        [
          'content_type' => 'HTML',
          'content' => '<section id="health-safety" class="">
  <div class="container mx-auto px-4 sm:px-6 lg:px-8">
    <h2 class="text-3xl font-bold mb-8">Health & Safety</h2>

    <!-- Our Environment -->
    <div class="mb-8">
      <h3 class="text-2xl font-semibold mb-2">Our Environment</h3>
      <p class="mb-2">
        At <strong>Dhaka Credit Child Care and Education Center</strong>, we prioritize creating a safe, clean, and nurturing environment for every child. Our classrooms, play areas, and facilities are regularly sanitized and designed to promote exploration, learning, and well-being.
      </p>
      <p>
        We actively encourage children to adopt healthy habits, maintain good hygiene, and engage in regular physical activity. Our environment supports both emotional and physical growth, ensuring children feel secure, happy, and confident.
      </p>
    </div>

    <!-- Our Staff -->
    <div class="mb-8">
      <h3 class="text-2xl font-semibold mb-2">Our Staff</h3>
      <p class="mb-2">
        Our trained and dedicated staff are committed to providing high-quality care and education. Teachers undergo continuous professional development and child safety training to ensure your child is in capable hands.
      </p>
      <ul class="list-disc ml-6">
        <li>Certified in early childhood education and first aid</li>
        <li>Trained to recognize and manage emotional and physical needs</li>
        <li>Regularly updated on best practices for child safety and development</li>
      </ul>
    </div>

    <!-- Health Policies -->
    <div class="mb-8">
      <h3 class="text-2xl font-semibold mb-2">Health Policies</h3>
      <p class="mb-2">
        The health and well-being of our children are paramount. Our policies ensure that children receive proper nutrition, care, and medical attention when needed.
      </p>
      <ul class="list-disc ml-6">
        <li>Regular handwashing and hygiene routines</li>
        <li>Safe handling and storage of food</li>
        <li>Immediate attention to injuries and illnesses</li>
        <li>Strict adherence to medication administration protocols</li>
        <li>Emergency preparedness and fire safety procedures</li>
      </ul>
    </div>

    <!-- Safety Measures -->
    <div class="mb-8">
      <h3 class="text-2xl font-semibold mb-2">Safety Measures</h3>
      <p class="mb-2">
        Safety is embedded in every aspect of our operations, ensuring children learn, play, and grow without risk.
      </p>
      <ul class="list-disc ml-6">
        <li>Controlled access to the premises</li>
        <li>Secure playgrounds and classroom areas</li>
        <li>Regular safety drills and monitoring</li>
        <li>Qualified staff to supervise all activities</li>
      </ul>
    </div>

    <p class="mt-6 text-center font-semibold">
      By combining a safe environment, skilled staff, and clear health policies, we provide children with the foundation to explore, learn, and grow with confidence.
    </p>
  </div>
</section>
',
        ]
      ],
      'Nutrition & Meals' => [
        [
          'content_type' => 'HTML',
          'content' => '<section id="nutrition-meals" class="">
  <div class="container mx-auto px-4 sm:px-6 lg:px-8">
    <h2 class="text-3xl font-bold mb-8">Nutrition & Meals</h2>

    <!-- Healthy Meals -->
    <div class="mb-8">
      <h3 class="text-2xl font-semibold mb-2">Healthy & Balanced Meals</h3>
      <p class="mb-2">
        At <strong>Dhaka Credit Child Care and Education Center</strong>, we provide nutritious and balanced meals designed to support your child’s growth, energy, and overall well-being. Our weekly menu is carefully planned and displayed at the reception for parent reference.
      </p>
      <p>
        Meals are free from pork and beef and include a variety of fresh fruits, vegetables, grains, and proteins to ensure that children receive wholesome nutrition throughout the day.
      </p>
    </div>

    <!-- Special Dietary Needs -->
    <div class="mb-8">
      <h3 class="text-2xl font-semibold mb-2">Special Dietary Needs</h3>
      <p class="mb-2">
        We understand that each child may have unique dietary requirements. Parents are requested to inform us of any allergies, intolerances, or preferences on the Registration Form and during admission.
      </p>
      <p>
        Our staff ensures that children with special dietary needs receive meals that are safe, nutritious, and enjoyable.
      </p>
    </div>

    <!-- Snack Policy -->
    <div class="mb-8">
      <h3 class="text-2xl font-semibold mb-2">Snack Policy</h3>
      <p class="mb-2">
        Children are encouraged to eat the meals provided by the center to maintain balanced nutrition. Outside food or snacks should only be brought on special occasions and with prior approval from the staff.
      </p>
      <p>
        This helps us ensure that all children receive healthy, age-appropriate meals and maintain a consistent routine throughout the day.
      </p>
    </div>

    <p class="mt-6 text-center font-semibold">
      By providing healthy meals, accommodating special dietary needs, and promoting good eating habits, we help children grow strong, happy, and ready to explore their world.
    </p>
  </div>
</section>
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
          'content' => '<section id="disclaimer" class="">
  <div class="container mx-auto px-4 sm:px-6 lg:px-8">
    <h2 class="text-3xl font-bold mb-8">Disclaimer</h2>

    <p class="mb-4">
      The information provided on the <strong>Dhaka Credit Child Care and Education Center</strong> website is intended for general informational purposes only. While we strive to keep the content accurate and up-to-date, we make no guarantees regarding the completeness, reliability, or accuracy of the information presented.
    </p>

    <p class="mb-4">
      Use of the website and its content is at your own risk. We are not responsible for any loss, damage, or inconvenience caused by reliance on the information contained on this site. Parents and guardians should independently verify details related to programs, services, schedules, fees, and policies before making decisions.
    </p>

    <p class="mb-4">
      Links to third-party websites are provided for convenience only. We do not endorse, guarantee, or take responsibility for the content, products, services, or privacy practices of these external websites.
    </p>

    <p class="mb-4">
      All content, images, logos, and materials on this website are the property of Dhaka Credit Child Care and Education Center or used with permission. Unauthorized use or reproduction of any material is strictly prohibited.
    </p>

    <p class="mt-6">
      By using this website, you acknowledge and agree to this disclaimer. For any questions or concerns, please contact us directly for clarification.
    </p>
  </div>
</section>
',
        ]
      ],
      'Terms of Service' => [
        [
          'heading' => 'Page Title', // e.g., 'Privacy Policy'
          'sub_heading' => 'Important legal information.',
          'content_type' => 'HTML',
          'content' => '<section id="terms-of-service" class="">
  <div class="container mx-auto px-4 sm:px-6 lg:px-8">
    <h2 class="text-3xl font-bold mb-8">Terms of Service</h2>

    <p class="mb-4">
      Welcome to the <strong>Dhaka Credit Child Care and Education Center</strong> website. By accessing or using this website, you agree to comply with and be bound by the following Terms of Service. If you do not agree with these terms, please refrain from using our website.
    </p>

    <h3 class="text-xl font-semibold mt-6 mb-2">Use of Website</h3>
    <p class="mb-4">
      The website and its content are intended for informational purposes related to our child care and educational services. You may not use the website for unlawful purposes or in ways that could harm or interfere with the functioning of the site.
    </p>

    <h3 class="text-xl font-semibold mt-6 mb-2">Intellectual Property</h3>
    <p class="mb-4">
      All content, including text, images, graphics, logos, and videos, are the property of Dhaka Credit Child Care and Education Center or used with permission. You may not copy, reproduce, distribute, or modify any content without our prior written consent.
    </p>

    <h3 class="text-xl font-semibold mt-6 mb-2">Third-Party Links</h3>
    <p class="mb-4">
      Our website may contain links to third-party websites. These links are provided for convenience only. We do not control, endorse, or assume responsibility for the content, services, or privacy practices of third-party websites.
    </p>

    <h3 class="text-xl font-semibold mt-6 mb-2">Limitation of Liability</h3>
    <p class="mb-4">
      While we strive to provide accurate and current information, Dhaka Credit Child Care and Education Center makes no warranties or guarantees regarding the website’s content. We shall not be liable for any damages, losses, or inconvenience resulting from the use of this website.
    </p>

    <h3 class="text-xl font-semibold mt-6 mb-2">Changes to Terms</h3>
    <p class="mb-4">
      We reserve the right to update or modify these Terms of Service at any time without prior notice. Continued use of the website constitutes acceptance of the revised terms.
    </p>

    <p class="mt-6">
      By using this website, you acknowledge that you have read, understood, and agree to these Terms of Service. For any questions, please contact us directly.
    </p>
  </div>
</section>
',
        ]
      ],
      'Privacy Policy' => [
        [
          'heading' => 'Page Title', // e.g., 'Privacy Policy'
          'sub_heading' => 'Important legal information.',
          'content_type' => 'HTML',
          'content' => '<section id="privacy-policy" class="">
  <div class="container mx-auto px-4 sm:px-6 lg:px-8">
    <h2 class="text-3xl font-bold mb-8">Privacy Policy</h2>

    <p class="mb-4">
      At <strong>Dhaka Credit Child Care and Education Center</strong>, we take your privacy seriously. This Privacy Policy explains how we collect, use, and protect personal information when you visit our website or use our services.
    </p>

    <h3 class="text-xl font-semibold mt-6 mb-2">Information We Collect</h3>
    <p class="mb-4">
      We may collect personal information, including but not limited to your name, email address, phone number, and details related to your child, when you submit forms, register for programs, or interact with our website.
    </p>

    <h3 class="text-xl font-semibold mt-6 mb-2">Use of Information</h3>
    <p class="mb-4">
      The information we collect is used to provide and improve our services, communicate with parents and guardians, process registrations, and ensure the safety and well-being of children in our care. We do not sell or share personal information with third parties for marketing purposes.
    </p>

    <h3 class="text-xl font-semibold mt-6 mb-2">Data Security</h3>
    <p class="mb-4">
      We implement reasonable administrative, technical, and physical measures to protect personal information from unauthorized access, disclosure, or misuse. While we take precautions, no data transmission over the internet can be guaranteed to be completely secure.
    </p>

    <h3 class="text-xl font-semibold mt-6 mb-2">Cookies and Tracking</h3>
    <p class="mb-4">
      Our website may use cookies and similar tracking technologies to enhance user experience, analyze website traffic, and optimize content. You may choose to disable cookies in your browser, but some features of the website may not function properly.
    </p>

    <h3 class="text-xl font-semibold mt-6 mb-2">Third-Party Services</h3>
    <p class="mb-4">
      We may use third-party services to assist with website functionality, analytics, or communication. These providers are bound by their own privacy policies, and we encourage users to review them.
    </p>

    <h3 class="text-xl font-semibold mt-6 mb-2">Children’s Privacy</h3>
    <p class="mb-4">
      Protecting the privacy of children is a top priority. We only collect information about children with parental consent and use it solely for educational and care purposes.
    </p>

    <h3 class="text-xl font-semibold mt-6 mb-2">Changes to This Policy</h3>
    <p class="mb-4">
      We reserve the right to update or modify this Privacy Policy at any time. Updates will be posted on this page with the revision date. Continued use of our website or services constitutes acceptance of the updated policy.
    </p>

    <p class="mt-6">
      If you have any questions or concerns about our privacy practices, please contact us directly.
    </p>
  </div>
</section>
',
        ]
      ],
    ];

    foreach ($pages as $title => $sections) {
      $slug = Str::slug($title);
      $excerpt = isset($sections[0]['excerpt']) ? $sections[0]['excerpt'] : $this->faker->paragraph(2);

      $page = Page::firstOrCreate(
        ['slug' => $slug],
        [
          'title' => $title,
          'meta_title' => $title,
          'meta_description' => $excerpt,
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
