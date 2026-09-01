import v2 from 'public/images/projects/v2.png';
import JordanGPT from 'public/images/projects/JordanGPT.png';
import dictionary from 'public/images/projects/dictionary.png';
import rps from 'public/images/projects/rps.png';
import countries from 'public/images/projects/countries.png';
import pomodoro from 'public/images/projects/pomodoro.png';
import exteriorProStack from 'public/images/projects/exterior-pro-stack.png';
import legendaryBarber from 'public/images/projects/legendary-barber.png';
import nflRankings from 'public/images/projects/nfl-rankings.png';

export const products = [
  {
    href: 'https://www.legendarybarbercompetition.com/',
    title: 'Legendary Barber Competition',
    description:
      'An invite-only event site for Shedeur Sanders, Cleveland Browns quarterback, spotlighting elite barber talent and craft.',
    thumbnail: legendaryBarber,
    images: [legendaryBarber, legendaryBarber],
    stack: ['Nextjs', 'Tailwindcss'],
    slug: 'legendary-barber',
    content: (
      <div className="text-foreground">
        <p>
          Legendary Barber Competition is a branded event site I built for
          Shedeur Sanders, NFL quarterback for the Cleveland Browns. The
          competition is a private, invite-only experience in Cleveland that
          puts elite barber talent, creativity, and craftsmanship on stage —
          with selected barbers competing for the title of Shedeur Sanders&apos;
          Official Barber for the upcoming football season.
        </p>
        <p>
          The site is a dark, gold-accented Next.js marketing experience:
          Shedeur&apos;s bio and socials, competition details, a three-step
          Apply / Get Selected / Compete process, partner logos, and a
          submission flow for Cleveland-area barbers. It needed to feel premium
          enough for an athlete-backed brand while still making the event
          logistics — date, location, access, and deadline — immediately clear.
        </p>
      </div>
    ),
  },
  {
    href: 'https://exteriorprostack.tech/',
    title: 'Exterior Pro Stack',
    description:
      'A two-sided marketplace for recurring exterior care and on-demand jobs, spanning web, native, and Stripe-powered payouts.',
    thumbnail: exteriorProStack,
    images: [exteriorProStack, exteriorProStack],
    stack: ['Nextjs', 'Expo', 'tRPC', 'Prisma', 'Stripe'],
    slug: 'exterior-pro-stack',
    content: (
      <div className="text-foreground">
        <p>
          Exterior Pro Stack is a two-sided platform for everything outside the
          walls: lawn care, gutter cleaning, pressure washing, and related
          services. Homeowners and property managers can subscribe to a
          recurring plan with the same verified crew, or post a one-time job and
          let local providers compete on price. The company is merchant of
          record, so customers pay through the platform, funds are held until
          the visit is complete, and independent crews get paid via Stripe
          Connect.
        </p>
        <p>
          The product is a Turborepo monorepo rather than a single app. Next.js
          powers the marketing site plus customer, provider, and admin portals.
          Expo and React Native cover the homeowner and field-crew apps, with a
          shared tRPC API, Prisma on MySQL, Vercel Blob for job photos, and
          Twilio for SMS updates. That stack supports bidding, subscriptions,
          crew dispatch, before-and-after photo proof, and an admin dashboard
          without splitting the business across disconnected codebases.
        </p>
      </div>
    ),
  },
  {
    href: 'https://nfl-rankings-rose.vercel.app/',
    title: 'Football Power Rankings',
    description:
      'Train a TensorFlow.js model on ESPN box scores and rank the NFL or FBS against FPI and the AP poll.',
    thumbnail: nflRankings,
    images: [nflRankings, nflRankings],
    stack: ['Nextjs', 'TensorFlow.js', 'Tailwindcss'],
    slug: 'football-power-rankings',
    content: (
      <div className="text-foreground">
        <p>
          Football Power Rankings is a Next.js ranking engine that pulls every
          regular-season ESPN box score for a league and year, fits a small
          dense network on standardized point differential, and returns a power
          ranking you can read against ESPN. Pick NFL or FBS, pick a season back
          to 2000, and the server trains a 25-dimensional multilayer perceptron
          in TensorFlow.js — then lines our list up next to ESPN FPI (NFL) or
          the AP Top 25 (college).
        </p>
        <p>
          The model is not a black box. Each team-game becomes a 25-D vector of
          yards, efficiency, returns, turnovers, and clock — everything except
          the score — then a 25→128→64→32→1 ReLU network predicts margin. NFL
          ranks by mean predicted differential; FBS adds a Simple Rating System
          so a blowout over a cupcake is not the same as a blowout over a
          contender. Live seasons shrink toward last year until enough games
          have been played. Try it at{' '}
          <a
            href="https://nfl-rankings-rose.vercel.app/"
            target="_blank"
            rel="noreferrer"
            className="text-accent underline underline-offset-2 hover:text-accent-hover"
          >
            nfl-rankings-rose.vercel.app
          </a>
          .
        </p>
      </div>
    ),
  },
  {
    href: 'https://fantasyfootball-nextjs.vercel.app/',
    title: 'Nfl Last Longer',
    description:
      'A survivor league fantasy football application built on top of nextjs.',
    thumbnail: v2,
    images: [v2, v2],
    stack: ['Nextjs', 'Tailwindcss'],
    slug: 'nfl-last-longer',
    content: (
      <div className="text-foreground">
        <p>
          NFL Last Longer is a cutting-edge survivor league fantasy football
          application built on the robust Next.js framework. This innovative
          platform offers football enthusiasts a unique and engaging way to
          participate in fantasy leagues, where strategy and long-term planning
          are key to success. With its intuitive interface and responsive
          design, powered by Tailwind CSS, users can easily manage their teams,
          make crucial picks, and track their progress throughout the NFL
          season.
        </p>
        <p>
          What sets NFL Last Longer apart is its focus on the
          &quot;survivor&quot; format, challenging participants to select one
          winning team each week without repeating picks. This format adds an
          extra layer of excitement and strategy to traditional fantasy
          football, as users must carefully consider not just weekly matchups,
          but also preserve strong teams for later in the season. The
          application leverages Next.js&apos;s server-side rendering
          capabilities to provide real-time updates, ensuring that users always
          have access to the latest stats and information to inform their
          decisions.
        </p>
      </div>
    ),
  },
  {
    href: 'https://young-waters-37901.herokuapp.com/',
    title: 'Jordan GPT',
    description:
      'A replica of the popular LLM AI model, chatGPT, built with Vite, Node.js, and mySQL.',
    thumbnail: JordanGPT,
    images: [JordanGPT, JordanGPT],
    stack: ['Vite', 'Tailwindcss', 'Nodejs', 'mySQL'],
    slug: 'jordan-gpt',
    content: (
      <div className="text-foreground">
        <p>
          Jordan GPT is a meticulously crafted replica of the popular ChatGPT,
          showcasing advanced web development skills and a deep understanding of
          modern AI interfaces. Built using Vite for lightning-fast performance,
          Node.js for robust backend functionality, and MySQL for efficient data
          management, this project demonstrates the ability to create complex,
          interactive web applications. The user interface, styled with Tailwind
          CSS, faithfully reproduces the clean, intuitive design of the original
          ChatGPT, ensuring a familiar and user-friendly experience.
        </p>
        <p>
          This clone not only mimics the look of ChatGPT but also replicates its
          core functionality, allowing users to engage in natural language
          conversations with an AI. While it does use the actual GPT model, it
          serves as an impressive technical showcase, highlighting the
          developer&apos;s proficiency in full-stack development, API
          integration, and user interface design. Jordan GPT stands as a
          testament to the power of modern web technologies and the potential
          for creating sophisticated, AI-driven applications using open-source
          tools and frameworks.
        </p>
      </div>
    ),
  },
  {
    href: 'https://jordanvera.github.io/dictionary/',
    title: 'Dictionary',
    description:
      'A simple dictionaty application built with Vite and Tailwindcss.',
    thumbnail: dictionary,
    images: [dictionary, dictionary],
    stack: ['Vite', 'Tailwindcss'],
    slug: 'dictionary',
    content: (
      <div className="text-foreground">
        <p>
          The Dictionary application is a sleek and efficient tool built with
          Vite and styled with Tailwind CSS, offering users a comprehensive and
          user-friendly way to explore the English language. This application
          goes beyond simple word lookups, providing a rich set of features that
          cater to language enthusiasts, students, and professionals alike.
          Users can easily search for words and instantly access their
          definitions, making it an invaluable resource for expanding vocabulary
          or clarifying meanings.
        </p>
        <p>
          What sets this Dictionary app apart is its attention to detail and
          additional features that enhance the learning experience. For each
          word, users can find multiple definitions when applicable, ensuring a
          thorough understanding of various contexts and usages. The inclusion
          of parts of speech helps users grasp the grammatical function of
          words, while example sentences demonstrate practical applications in
          context. Perhaps most notably, the integration of audio snippets
          allows users to hear the correct pronunciation, making it an excellent
          tool for both native speakers and language learners. This combination
          of visual and auditory information creates a comprehensive reference
          tool that&apos;s both practical and engaging.
        </p>
      </div>
    ),
  },
  {
    href: 'https://jordanvera.github.io/rockPaperScissor/',
    title: 'Rock, Paper, Scissors',
    description:
      'A simple rock, paper, scissors game built with Vite and Tailwindcss with a score counter.',
    thumbnail: rps,
    images: [rps, rps],
    stack: ['Vite', 'Tailwindcss'],
    slug: 'rock-paper-scissors',
    content: (
      <div className="text-foreground">
        <p>
          Rock, Paper, Scissors is a classic game brought to life in the digital
          realm, serving as a milestone project in the developer&apos;s journey.
          Built with Vite for optimal performance and styled with Tailwind CSS
          for a clean, modern look, this game offers a simple yet engaging
          experience for users of all ages. As the developer&apos;s first foray
          into game development, it showcases fundamental programming concepts
          and user interface design principles, making it a testament to the
          learning process and growth in web development skills.
        </p>
        <p>
          While maintaining the simplicity of the traditional game, this digital
          version introduces features that enhance the playing experience.
          Players compete against a computer opponent, testing their luck and
          strategy in quick, fun rounds. The addition of a score counter brings
          a competitive edge, allowing players to track their wins and losses
          over multiple games. The implementation of a game loop ensures smooth
          gameplay, seamlessly transitioning from one round to the next. Despite
          its simplicity, this Rock, Paper, Scissors game demonstrates attention
          to user experience and serves as a solid foundation for more complex
          game development projects in the future.
        </p>
      </div>
    ),
  },
  {
    href: 'https://jordanvera.github.io/restCountries/',
    title: 'REST Countries',
    description:
      'A beautiful and comprehensive Tailwind CSS components library for building modern websites and applications.',
    thumbnail: countries,
    images: [countries, countries],
    stack: ['Vite', 'Tailwindcss'],
    slug: 'countries',
    content: (
      <div className="text-foreground">
        <p>
          REST Countries is an innovative web application that serves as a
          comprehensive database of nations worldwide. Built with Vite for
          optimal performance and styled with Tailwind CSS for a sleek, modern
          interface, this project showcases the developer&apos;s ability to
          integrate external APIs and create engaging user experiences. By
          leveraging a robust country data API, the application provides users
          with a wealth of information about every country on the globe, making
          it an invaluable resource for students, travelers, and anyone curious
          about the world&apos;s nations.
        </p>
        <p>
          What sets REST Countries apart is its unique front-end design, which
          transforms raw data into an intuitive and visually appealing
          interface. Users can easily navigate through the extensive database,
          exploring details such as population, capital cities, languages,
          currencies, and geographical information for each country. The
          application likely includes features like search functionality,
          allowing users to quickly find specific countries, and filtering
          options to sort countries by region, population, or other criteria.
          This project not only demonstrates technical proficiency in API
          integration and front-end development but also serves as an
          educational tool, promoting global awareness and cultural
          understanding in an accessible, user-friendly format.
        </p>
      </div>
    ),
  },
  {
    href: 'https://jordanvera.github.io/pomodoro/',
    title: 'Pomodoro',
    description:
      'A pomodoro application to track productivity made simple to use for anyone.',
    thumbnail: pomodoro,
    images: [pomodoro, pomodoro],
    stack: ['Vite', 'Tailwindcss'],
    slug: 'pomodoro',
    content: (
      <div className="text-foreground">
        <p>
          The Pomodoro application is a powerful productivity tool designed to
          help users maximize their focus and efficiency using the popular
          Pomodoro Technique. Built with Vite for seamless performance and
          styled with Tailwind CSS for a clean, modern interface, this app
          offers a user-friendly experience that can boost productivity for
          students, professionals, and anyone looking to manage their time more
          effectively. At its core, the application provides a customizable
          timer that alternates between focused work sessions and short breaks,
          helping users maintain concentration and avoid burnout.
        </p>
        <p>
          What sets this Pomodoro app apart is its flexibility and attention to
          user preferences. The ability to customize work and break intervals
          allows users to tailor the technique to their personal productivity
          rhythms, whether they prefer the traditional 25-minute work sessions
          or need longer periods of focused time. The inclusion of theme changes
          adds a personal touch, enabling users to create a visually comfortable
          environment that suits their taste and reduces eye strain during
          extended use. These features, combined with its intuitive design, make
          this Pomodoro application a versatile and indispensable tool for
          anyone looking to enhance their time management skills and boost their
          daily productivity.
        </p>
      </div>
    ),
  },
];
