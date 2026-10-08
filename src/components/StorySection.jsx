import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  Orbit,
  Compass,
  Radio,
  Activity,
  Cpu,
  MapPin,
  Telescope,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Layers,
  Award,
  Zap,
  Signal,
  CheckCircle2,
  Volume2,
  VolumeX,
  Star,
  ArrowRight,
  ArrowLeft,
  Wrench,
  BookOpen,
  Maximize2,
  X
} from 'lucide-react';

// Zero-dependency NASA Quindar Beep audio synthesizer via Web Audio API
const playQuindarTone = (isIntro = true) => {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    // Intro Quindar beep: 2524 Hz; Outro: 2475 Hz
    osc.type = 'sine';
    osc.frequency.setValueAtTime(isIntro ? 2524 : 2475, ctx.currentTime);

    gain.gain.setValueAtTime(0.06, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.18);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.18);
  } catch (err) {
    // Audio context not allowed or unsupported
  }
};

const HERO_STORIES = [
  {
    id: 'surveyor',
    world: 'Moon',
    title: 'Surveyor 3: The Robot Visited by Human Hands',
    hero: 'Surveyor 3 Lunar Lander',
    shortName: 'Surveyor 3',
    badge: 'Human Handshake Pioneer',
    badgeEmoji: '🤝',
    tag: 'Apollo 12 Landmark',
    location: 'Ocean of Storms, Moon',
    lifespan: 'April 1967 (Primary Mission)',
    odometer: 'Soft Landing Site',
    icon: Radio,
    accentColor: '#2dd4bf',
    chapters: [
      {
        actNumber: 1,
        actLabel: 'Act 1: The Human Landing Pad',
        title: 'Ocean of Storms: Testing the Dust',
        radioLog:
          'April 1967: Touchdown confirmed. Claw arm deployed. Scraping lunar soil. Resistance confirmed: the Moon is solid. Human boots can land here.',
        story:
          'Before Apollo, scientists worried the Moon was covered in a deep ocean of powdery dust that would swallow spaceships whole. Surveyor 3 soft-landed in 1967 and dug small trenches with its scoop, proving the ground was firm and paving the way for human astronauts.',
        funFact:
          'Electric Soil Claw: Extended on a pantograph arm to dig trenches and measure soil bearing strength for the upcoming Apollo missions.',
        hardwareIcon: Wrench,
      },
      {
        actNumber: 2,
        actLabel: 'Act 2: The Astronaut Handshake',
        title: 'Apollo 12: Humans Visit a Robot',
        radioLog:
          'Apollo 12 Comms: Conrad: There she is! Surveyor 3 is resting right inside the crater rim! We are walking right up to it!',
        story:
          'In November 1969, Apollo 12 astronauts Pete Conrad and Alan Bean landed within walking distance. For the only time in history, humans visited a robotic spacecraft that was already waiting on another world, taking photographs and inspecting its sun-baked metal.',
        funFact:
          'Pinpoint Landing: Apollo 12 executed a precision landing just 600 feet away from Surveyor 3 after navigating 240,000 miles through space!',
        hardwareIcon: Zap,
      },
      {
        actNumber: 3,
        actLabel: 'Act 3: Space Germ Mystery',
        title: 'Earth Lab: Life Survives the Vacuum',
        radioLog:
          'Laboratory Telemetry: Surveyor 3 camera disassembled in sterile cleanroom. Streptococcus mitis spores detected after 31 months in lunar vacuum!',
        story:
          'Astronauts clipped off Surveyor 3 television camera and brought it back to Earth. In sterile labs, researchers discovered that common Earth bacteria had survived 31 months in the freezing lunar vacuum and radiation, proving life is far tougher than anyone imagined.',
        funFact:
          'Museum Piece: The retrieved Surveyor 3 camera is now displayed at the National Air and Space Museum in Washington, D.C. as a testament to robotic durability.',
        hardwareIcon: Star,
      },
    ],
    status: 'Preserved inside Surveyor Crater as the only robotic explorer on another world ever visited and touched by human astronauts.',
  },
  {
    id: 'lrv',
    world: 'Moon',
    title: 'The Lunar Buggy: Electric Cruisers on the Moon',
    hero: 'Apollo Lunar Roving Vehicle',
    shortName: 'Apollo LRV',
    badge: 'Lunar Buggy Driver',
    badgeEmoji: '🚗',
    tag: '90.2 km Traverse',
    location: 'Hadley-Apennine, Moon',
    lifespan: 'Apollo 15, 16, & 17 (1971 - 1972)',
    odometer: '90.2 km Combined Traverse',
    icon: Cpu,
    accentColor: '#a78bfa',
    chapters: [
      {
        actNumber: 1,
        actLabel: 'Act 1: Unfolding the Buggy',
        title: 'Hadley Rille: First Drive on the Moon',
        radioLog:
          'Apollo 15 Comms: Rover 1 deployed from descent stage. Zero to eight miles per hour on lunar dust. Steering nominal. Houston, we are driving on the Moon!',
        story:
          'NASA folded an electric car like an origami box inside the Apollo Lunar Module. On the Moon, astronauts pulled two nylon cords and the buggy unfolded onto the lunar regolith. It had no gas engine or steering wheel: just a T-shaped joystick and electric motors in each wheel hub.',
        funFact:
          'Piano-Wire Tires: Woven from zinc-coated steel piano wire with titanium chevrons. Rubber tires would freeze solid and shatter in the lunar cold!',
        hardwareIcon: Wrench,
      },
      {
        actNumber: 2,
        actLabel: 'Act 2: Orange Moon Soil',
        title: 'Shorty Crater: The Volcanic Breakthrough',
        radioLog:
          'Apollo 17 Comms: Schmitt reporting from Shorty Crater: I see orange soil! It is everywhere! Bagging samples of ancient volcanic fire fountains!',
        story:
          'The rover gave astronauts a huge range beyond their lander. At Shorty Crater, geologist Harrison Schmitt noticed brilliant orange soil: microscopic beads of volcanic glass erupted from ancient lunar volcanoes 3.6 billion years ago, revolutionizing lunar history.',
        funFact:
          'One-Hand Joystick: Astronauts drove with thick pressurized gloves using a single T-handle for forward, reverse, and turns: no pedals required!',
        hardwareIcon: Zap,
      },
      {
        actNumber: 3,
        actLabel: 'Act 3: The Eternal Camera',
        title: 'Station 9: The Last Farewell to Earth',
        radioLog:
          'Apollo 17 Final Log: Parking Rover at Station 9. High-gain antenna locked on Earth. Camera auto-tracking ascent stage. Goodbye, Taurus-Littrow.',
        story:
          'Before blasting off, astronauts parked each rover facing their lander so the vehicle camera could film the Apollo ascent stage blasting back into space. All three rovers remain frozen in pristine condition in the airless lunar vacuum, waiting for humanity to return.',
        funFact:
          'Permanent Preservation: In the lunar vacuum with no atmosphere, rain, or wind, these rovers will look almost completely brand-new 1,000 years from now!',
        hardwareIcon: Star,
      },
    ],
    status: 'All three rovers remain in pristine condition in the lunar vacuum, their cameras permanently facing Earth.',
  },
  {
    id: 'viking',
    world: 'Mars',
    title: "Viking 1: Humanity's First Permanent Footprint on Mars",
    hero: 'Viking 1 Lander',
    shortName: 'Viking 1',
    badge: 'First Mars Explorer',
    badgeEmoji: '🛸',
    tag: '2,245 Sols Station',
    location: 'Chryse Planitia, Mars',
    lifespan: '1976 - 1982 (2,245 Sols)',
    odometer: 'First Operational Station',
    icon: Telescope,
    accentColor: '#fb923c',
    chapters: [
      {
        actNumber: 1,
        actLabel: 'Act 1: Red Sky Touchdown',
        title: 'Chryse Planitia: 25 Seconds to History',
        radioLog:
          'July 20, 1976: Touchdown confirmed. Camera scanning. First image processing: horizon visible, pink sky, red rocks. We have arrived on Mars.',
        story:
          'On July 20, 1976, Viking 1 completed the first successful soft landing on Mars. Just 25 seconds after touching down, its camera began scanning the surface, transmitting the first close-up view of red Martian rocks and an alien pink sky back to Earth.',
        funFact:
          'Showerhead Thrusters: 18 descent engines had special showerhead nozzles to avoid blasting away the Martian soil before touchdown.',
        hardwareIcon: Zap,
      },
      {
        actNumber: 2,
        actLabel: 'Act 2: Alien Biology Lab',
        title: 'Sol 8: The Soil Experiment Surprise',
        radioLog:
          'Biology Instrument Log: Soil sample loaded into test chamber. Carbon-14 gas release detected. High chemical reactivity. Is this life or mysterious chemistry?',
        story:
          'Viking 1 carried an automated biology lab smaller than a suitcase. When nutrients and water were added to Martian dirt, gases bubbled up in an astonishing reaction that scientists still debate today, sparking humanity search for extraterrestrial microbes.',
        funFact:
          'Robotic Soil Shovel: A 10-foot extendable arm dug trenches in Martian dirt and dropped samples into miniature automated onboard ovens.',
        hardwareIcon: Wrench,
      },
      {
        actNumber: 3,
        actLabel: 'Act 3: Six Years of Silence',
        title: 'Sol 2,245: The Lost Command',
        radioLog:
          'November 1982: Uploading software patch: Transmission interrupted. Antenna misalignment. No signal returned. Viking 1 has completed its watch.',
        story:
          'Viking 1 operated for six years in temperatures dipping to -111 degrees Celsius. In 1982, a routine software update accidentally pointed its antenna away from Earth. It remains resting in the golden plain of Chryse Planitia, humanity first permanent base on Mars.',
        funFact:
          'Nuclear Heart: Powered by plutonium radioisotope generators that kept the lander warm and alive through over 2,200 freezing Martian nights.',
        hardwareIcon: Star,
      },
    ],
    status: 'Silently standing in Chryse Planitia after its final engineering transmission in November 1982.',
  },
  {
    id: 'oppy',
    world: 'Mars',
    title: 'Opportunity: The 90-Day Rover That Lived 15 Years',
    hero: 'Opportunity (Oppy)',
    shortName: 'Oppy',
    badge: 'Mars Marathoner',
    badgeEmoji: '🏅',
    tag: '5,111 Sols Active',
    location: 'Perseverance Valley, Mars',
    lifespan: '2004 - 2018 (5,111 Sols)',
    odometer: '45.16 km Driven',
    icon: Compass,
    accentColor: '#34d399',
    chapters: [
      {
        actNumber: 1,
        actLabel: 'Act 1: The Drop',
        title: 'Sol 1: Bouncing into Eagle Crater',
        radioLog:
          'Transmission from Mars: Airbags inflated. Touchdown confirmed! Bounced 26 times into a bullseye crater. Beginning 90-day mission: or so they think.',
        story:
          'On January 25, 2004, Opportunity slammed into the Martian atmosphere at 12,000 mph, deployed a supersonic parachute, and inflated 24 giant airbags. It bounced 26 times across the red dirt like a giant beach ball before rolling into Eagle Crater. Engineers in Pasadena erupted: it was an interplanetary hole-in-one!',
        funFact:
          'Airbag Cocoon: Opportunity landed without thruster rockets on the surface. Giant woven-Kevlar balloons took all the impact so the robot stayed completely safe.',
        hardwareIcon: Zap,
      },
      {
        actNumber: 2,
        actLabel: 'Act 2: Secret Water',
        title: 'Sol 34: Uncovering Martian Blueberries',
        radioLog:
          'Transmission from Mars: Rock drill engaged. Rock surface reveals microscopic spheres. These hematite beads formed in liquid water. Mars was once an ocean world!',
        story:
          'Just weeks into exploring, Opportunity pressed its diamond-tipped Rock Abrasion Tool into bedrock and discovered microscopic spherules nicknamed "blueberries." On Earth, these minerals only grow in standing water, providing the first physical proof that ancient Mars had liquid lakes and oceans.',
        funFact:
          'Rock Abrasion Tool (RAT): A spinning diamond cutter that shaved away weathered crust to expose pristine minerals untouched for billions of years.',
        hardwareIcon: Wrench,
      },
      {
        actNumber: 3,
        actLabel: 'Act 3: Sleeping Hero',
        title: 'Sol 5,111: The Marathon Runner Rest',
        radioLog:
          'Final Transmission: The sky has turned dark bronze. Solar power at 22 watt-hours. My marathon is complete. It was worth every Sol.',
        story:
          'Built for only 90 days, Opportunity survived 15 freezing Martian winters and drove 45.16 kilometers: completing the first human marathon on another planet. When a monster dust storm blanketed the entire planet in 2018, it sent a final signal and entered eternal sleep in Perseverance Valley.',
        funFact:
          'Dust Devil Cleaners: Oppy survived for 15 years because Martian dust devils (mini tornadoes) regularly swept across its solar panels and cleaned off the dust!',
        hardwareIcon: Star,
      },
    ],
    status: 'Quietly resting in Perseverance Valley after a planet-wide dust storm shielded sunlight from its solar arrays in 2018.',
  },
  {
    id: 'insight',
    world: 'Mars',
    title: 'InSight: Listening to the Red Planet Heartbeat',
    hero: 'InSight Geophysical Lander',
    shortName: 'InSight',
    badge: 'Marsquake Detective',
    badgeEmoji: '🎧',
    tag: '1,300+ Marsquakes',
    location: 'Elysium Planitia, Mars',
    lifespan: '2018 - 2022 (1,440 Sols)',
    odometer: 'Stationary Listening Post',
    icon: Activity,
    accentColor: '#38bdf8',
    chapters: [
      {
        actNumber: 1,
        actLabel: 'Act 1: The Listening Post',
        title: 'Elysium Planitia: Setting the Dome',
        radioLog:
          'Sol 0: Touchdown on Elysium Planitia. Robotic arm unlatched. Lowering seismic dome to the surface. First seismometer placed directly on Mars.',
        story:
          'Unlike rovers with wheels, InSight was engineered to stay in one spot and listen. It landed on a smooth, flat plain and used a robotic claw to delicately place an ultra-sensitive dome seismometer directly onto Martian soil to capture planetary vibrations.',
        funFact:
          'Windbreak Igloo: A protective copper dome shielded the seismometer from gusty winds and extreme temperature swings so it could hear tiny tremors.',
        hardwareIcon: Zap,
      },
      {
        actNumber: 2,
        actLabel: 'Act 2: The First Marsquake',
        title: 'Sol 128: The Planet Whispers',
        radioLog:
          'Seismic Event Sol 128: High-frequency tremor detected. Duration: 10 minutes. Magnitude 2.5. Mars is seismically alive!',
        story:
          'On April 6, 2019, InSight recorded the first Marsquake in history. Over four years, it logged more than 1,300 quakes and meteorite impacts. The seismic waves revealed that Mars has a thin crust, a molten mantle, and a giant liquid iron core.',
        funFact:
          'Sub-Atomic Sensor: The seismometer was so sensitive it could detect vibrations smaller than the diameter of a single hydrogen atom!',
        hardwareIcon: Wrench,
      },
      {
        actNumber: 3,
        actLabel: 'Act 3: The Dusty Farewell',
        title: 'Sol 1,440: Listening to the Very End',
        radioLog:
          'Sol 1,440 Final Log: Power critically low. Dust coverage at 80 percent. Attempting final seismic recording. Complete. It has been an honour to listen.',
        story:
          'Fine red atmospheric dust slowly coated InSight solar wings over four years. Engineers tried tricking the wind by dropping sand near the panels, but by December 2022 sunlight was completely blocked. InSight sent its final seismic data and went to sleep under the Martian sky.',
        funFact:
          'Dust-Clearing Trick: Scientists commanded InSight to drop coarse sand that the wind blew across the solar panels to sweep away fine dust, extending its life by months!',
        hardwareIcon: Star,
      },
    ],
    status: 'Concluded operations in December 2022 after fine red atmospheric dust settled over its solar arrays, ending electrical generation.',
  },
];

const SURVEYOR_COMIC_PAGES = [
  {
    page: 1,
    image: '/story/surveyor/page1.jpg',
    act: 'Page 1: The Moon Mystery',
    title: "The Moon's Big Mystery",
    sol: '1960s • Pre-Apollo Research',
    distance: 'Earth Observation Point',
    caption:
      "In the 1960s, scientists wondered what the Moon's surface was like: will it be hard and rocky, or soft and dusty? Before humans could land, a robotic scout had to go first to test the ground.",
    tag: 'Testing the Lunar Ground',
  },
  {
    page: 2,
    image: '/story/surveyor/page2.jpg',
    act: 'Page 2: Meet Surveyor 3!',
    title: 'The First Lunar Scout',
    sol: 'April 1967 • Spacecraft Assembly',
    distance: 'Robotic Scout Specification',
    caption:
      'Surveyor 3 was an automated robotic lander equipped with a TV camera to take pictures, a solar panel to provide power, and an extendable soil scoop to dig and test the ground—staying in one spot to study the Moon.',
    tag: 'Camera, Solar Panel & Scoop',
  },
  {
    page: 3,
    image: '/story/surveyor/page3.jpg',
    act: 'Page 3: Blast Off!',
    title: 'Roaring into Space',
    sol: 'April 17, 1967 • Cape Canaveral',
    distance: 'Atlas-Centaur Rocket',
    caption:
      'On April 17, 1967, Surveyor 3 launched from Cape Canaveral atop an Atlas-Centaur rocket with a thunderous roar. Cheering engineers watched as the brave scout blasted off toward the Moon.',
    tag: 'Atlas-Centaur Launch',
  },
  {
    page: 4,
    image: '/story/surveyor/page4.jpg',
    act: 'Page 4: Cislunar Journey',
    title: 'Three Days Among the Stars',
    sol: 'April 17–20, 1967 • Cislunar Transit',
    distance: '380,000 km Transit',
    caption:
      'It took about three days for Surveyor 3 to travel through deep space to the Moon. Mission controllers in Pasadena monitored flight telemetry around the clock as the lander closed in on its destination.',
    tag: 'Transit to the Moon',
  },
  {
    page: 5,
    image: '/story/surveyor/page5.jpg',
    act: 'Page 5: The Bouncy Landing',
    title: 'BOING! Double Bounce Touchdown',
    sol: 'April 20, 1967 • Ocean of Storms',
    distance: 'Oceanus Procellarum',
    caption:
      'On April 20, 1967, Surveyor 3 touched down in Oceanus Procellarum. A radar reflection glitch caused the engines to stay lit, making the lander bounce twice across the surface before safely coming to rest!',
    tag: 'Safe After Two Bounces',
  },
  {
    page: 6,
    image: '/story/surveyor/page6.jpg',
    act: 'Page 6: Eyes on the Moon',
    title: 'Say Cheese, Moon!',
    sol: 'April 1967 • Surface Telemetry',
    distance: '6,315 Panoramic Images',
    caption:
      "Surveyor 3's television camera began scanning the landscape, capturing and transmitting more than 6,000 sharp photographs of craters, rocks, and planet Earth, giving humans an intimate look at the Moon.",
    tag: '6,000+ Pictures Sent Home',
  },
  {
    page: 7,
    image: '/story/surveyor/page7.jpg',
    act: 'Page 7: The Little Scoop',
    title: "The Scoop's Big Discovery",
    sol: 'April 1967 • Surface Sampler',
    distance: 'Lunar Soil Trenches',
    caption:
      'Surveyor 3 extended its robotic arm and scoop to dig trenches into the lunar dirt. The soil was not too soft: it was firm enough to safely support a heavy Apollo lunar module with astronauts inside!',
    tag: 'Lunar Soil Proven Solid',
  },
  {
    page: 8,
    image: '/story/surveyor/page8.jpg',
    act: 'Page 8: The Cold Night',
    title: 'The Quiet Moon',
    sol: 'May 4, 1967 • Last Transmission',
    distance: 'Surveyor Crater',
    caption:
      "Surveyor 3's final transmission was received on May 4, 1967 as the Sun set and the freezing two-week lunar night enveloped Oceanus Procellarum. The robot's work was finished, but its story wasn't.",
    tag: 'Silent Sentinel in the Dark',
  },
  {
    page: 9,
    image: '/story/surveyor/page9.jpg',
    act: 'Page 9: Precision Landing',
    title: 'Visitors from Earth!',
    sol: 'November 19, 1969 • Apollo 12',
    distance: 'Intrepid Touchdown: ~160m',
    caption:
      'On November 19, 1969, Apollo 12 Lunar Module Intrepid executed a precision landing on the Moon, touching down just 160 meters from Surveyor 3. Astronauts looked out their window and saw their robotic predecessor waiting!',
    tag: 'Apollo 12 Arrives Nearby',
  },
  {
    page: 10,
    image: '/story/surveyor/page10.jpg',
    act: 'Page 10: Human Handshake',
    title: 'The Robot Visited by Human Hands',
    sol: 'November 20, 1969 • Historic Visit',
    distance: 'Surveyor Crater Rim',
    caption:
      'Astronauts Pete Conrad and Alan Bean walked up to Surveyor 3 and inspected its surfaces, detaching the TV camera and soil scoop to bring back to Earth. Two years later, humans visited the robot that prepared their way: small robot, giant legacy.',
    tag: 'Small Robot, Giant Legacy',
  },
];

const OPPORTUNITY_COMIC_PAGES = [
  {
    page: 1,
    image: '/story/opportunity/page1.png',
    act: 'Act 1: The Bouncing Drop',
    title: 'Touchdown in Eagle Crater',
    sol: 'Sol 1 • Jan 24, 2004',
    distance: '0.00 km',
    caption:
      'After traveling millions of kilometers through space, Opportunity inflated 24 giant airbags and bounced 26 times across the Martian dust into Eagle Crater. Planned for only 90 days, it began an odyssey destined to span over 14 years.',
    tag: 'Landing Hole-in-One',
  },
  {
    page: 2,
    image: '/story/opportunity/page2.png',
    act: 'Act 2: The Blueberries',
    title: 'Ancient Water Discovered',
    sol: 'Sol 34 • Meridiani Planum',
    distance: '0.12 km',
    caption:
      'Scanning the crater floor, Opportunity uncovered mysterious blue-gray spherules nicknamed "Martian blueberries." Mineral analysis proved they were hematite concretions formed in liquid water—the first physical proof that ancient Mars had standing water.',
    tag: 'Liquid Water Confirmed',
  },
  {
    page: 3,
    image: '/story/opportunity/page3.png',
    act: 'Act 3: Purgatory Dune',
    title: 'Dunes & Farewell to Spirit',
    sol: '2005 - 2010 • Global Teamwork',
    distance: '5.20 km',
    caption:
      'Opportunity became trapped axle-deep in treacherous Martian dunes. Engineers replicated the sand at JPL to guide the rover free. Later, twin rover Spirit fell silent in 2010, leaving Opportunity to carry humanity\'s Mars banner forward alone.',
    tag: 'Rescue & Twin Spirit',
  },
  {
    page: 4,
    image: '/story/opportunity/page4.png',
    act: 'Act 4: Victoria Crater',
    title: 'The Great Journey South',
    sol: '2006 • Beyond All Limits',
    distance: '10.50 km',
    caption:
      'Days became weeks, weeks became years. Opportunity reached the rim of the massive Victoria Crater. Even as dust dulled the solar arrays and mechanical joints aged, the intrepid explorer set its compass for the giant Endeavour Crater.',
    tag: 'Surpassing All Limits',
  },
  {
    page: 5,
    image: '/story/opportunity/page5.png',
    act: 'Act 5: The Marathon',
    title: 'First Interplanetary Marathon',
    sol: '2015 • Endeavour Rim Arrival',
    distance: '42.20 km (Marathon)',
    caption:
      'After more than a decade of navigating alien plains, Opportunity arrived at the rim of Endeavour Crater. Mission Control at JPL erupted in celebration as Oppy crossed 42.195 km—humanity\'s first full marathon on another world.',
    tag: 'Marathon Record: 42.2 km',
  },
  {
    page: 6,
    image: '/story/opportunity/page6.png',
    act: 'Act 6: Perseverance Valley',
    title: 'The Veteran Explorer',
    sol: '2017 - 2018 • Golden Sunset',
    distance: '45.10 km',
    caption:
      'Climbing along the rugged rim into Perseverance Valley, the aging rover captured majestic panoramic vistas and inspired a new generation: "To every student: dream big, explore, and ask questions. There is always more to discover."',
    tag: 'Perseverance Valley Rim',
  },
  {
    page: 7,
    image: '/story/opportunity/page7.png',
    act: 'Act 7: The Dust Monster',
    title: 'The Planet-Sized Storm',
    sol: 'June 10, 2018 • The Darkening Sky',
    distance: '45.16 km',
    caption:
      'A monstrous global dust storm enveloped the entire planet, blotting out sunlight and choking power generation. On June 10, 2018, Opportunity beamed its final transmission to Earth: "Opportunity still listening..." before falling silent.',
    tag: 'Final Signal to Earth',
  },
  {
    page: 8,
    image: '/story/opportunity/page8.png',
    act: 'Act 8: The Eternal Sentinel',
    title: 'A Machine May Rest, Discovery Endures',
    sol: '2004 - 2018 • Eternal Legacy',
    distance: '45.16 km Final Record',
    caption:
      '"My journey ended here, but my spirit keeps exploring." Resting peacefully under the starry skies of Perseverance Valley, Opportunity showed humanity what curiosity, grit, and engineering wonder can achieve.',
    tag: 'Mission Completed: 5,111 Sols',
  },
];

const APOLLO_LRV_COMIC_PAGES = [
  {
    page: 1,
    image: '/story/apollo-lrv/page1.png',
    act: 'Page 1: Moon Road Trip',
    title: 'A Car... On The Moon?!',
    sol: '1969 • NASA Marshall Space Flight Center',
    distance: '0.00 km',
    caption:
      'Astronauts could walk on the Moon, but walking took a long time and limited how far they could go. NASA engineers designed a small, lightweight electric vehicle that could drive across the lunar dust: giving astronauts wheels on another world!',
    tag: 'The Buggy Concept Born',
  },
  {
    page: 2,
    image: '/story/apollo-lrv/page2.png',
    act: 'Page 2: Cosmic Origami',
    title: 'Fold Me Up!',
    sol: 'July 1971 • Saturn V Rocket',
    distance: '0.00 km',
    caption:
      'How do you pack an electric vehicle into a compact spaceship? Engineers designed the Lunar Rover to fold up like origami into a tiny quadrant on the Lunar Module descent stage. Safely packed, it rocketed across a quarter-million miles of space.',
    tag: 'Origami Fold Design',
  },
  {
    page: 3,
    image: '/story/apollo-lrv/page3.png',
    act: 'Page 3: Touchdown & Deployment',
    title: 'Hello, Moon! First Drive',
    sol: 'Apollo 15 • July 1971 • Hadley Rille',
    distance: '27.8 km Traverse',
    caption:
      'Astronauts David Scott and James Irwin pulled nylon deployment cords, and the rover unfolded right onto the regolith. For the first time in human history, astronauts hopped aboard and drove across the surface of another celestial body!',
    tag: 'First Moon Drive in History',
  },
  {
    page: 4,
    image: '/story/apollo-lrv/page4.png',
    act: 'Page 4: Hadley Road Trip',
    title: 'The Moon Buggy Ride',
    sol: 'July 1971 • Hadley Plains',
    distance: 'Top Speed: 12 km/h',
    caption:
      'No roads, no traffic, and plenty of craters and bumps! Driving the rover kicked up rooster tails of powdery lunar dust, allowing astronauts to explore kilometers beyond their landing site with a five-star view of the Moon and Earth.',
    tag: 'Hadley-Apennine Traverse',
  },
  {
    page: 5,
    image: '/story/apollo-lrv/page5.png',
    act: 'Page 5: Mobile Laboratory',
    title: 'Science on Wheels',
    sol: 'Apollo 15 • Geological Survey',
    distance: '77 kg Samples Collected',
    caption:
      'The Lunar Rover was both a taxi and a rolling laboratory. Outfitted with high-gain antennas, color TV cameras, geological sampling tools, and rock storage compartments, it helped scientists back on Earth analyze the Moon\'s primordial history.',
    tag: 'TV Camera & Science Racks',
  },
  {
    page: 6,
    image: '/story/apollo-lrv/page6.png',
    act: 'Page 6: Descartes Highlands',
    title: 'Round Two! Apollo 16',
    sol: 'Apollo 16 • April 1972',
    distance: '26.7 km Traverse',
    caption:
      'In April 1972, Apollo 16 brought the second Lunar Rover to the Descartes Highlands. Astronauts John Young and Charles Duke climbed aboard to tackle rough, boulder-strewn slopes, proving four electric wheels could conquer steep highland terrain.',
    tag: 'Highland Grand Prix',
  },
  {
    page: 7,
    image: '/story/apollo-lrv/page7.png',
    act: 'Page 7: Taurus-Littrow Finale',
    title: 'The Moon Grand Finale',
    sol: 'Apollo 17 • December 1972',
    distance: '35.7 km Traverse',
    caption:
      'Eugene Cernan and geologist Harrison Schmitt took the third Lunar Rover through the towering mountains of Taurus-Littrow Valley. They discovered brilliant orange volcanic soil and traveled farther than any previous lunar expedition.',
    tag: 'Orange Soil Discovery',
  },
  {
    page: 8,
    image: '/story/apollo-lrv/page8.png',
    act: 'Page 8: Buggy Engineering',
    title: 'How Fast Is a Moon Car?',
    sol: 'Vehicle Specs & Wire Tires',
    distance: 'Top Speed: 18 km/h',
    caption:
      'Built with lightweight aerospace alloys, the rover weighed only 210 kg on Earth (35 kg on the Moon!). It featured woven zinc-coated steel piano wire tires and four independent 0.25-horsepower electric wheel motors, clocking a top speed of 18 km/h.',
    tag: 'Piano-Wire Tires & 4WD',
  },
  {
    page: 9,
    image: '/story/apollo-lrv/page9.png',
    act: 'Page 9: The Last Farewell',
    title: 'We Have to Leave You Here',
    sol: 'December 1972 • Final Parking Spot',
    distance: '90.2 km Total Traverse',
    caption:
      'After completing their expeditions, astronauts parked the rovers facing the Lunar Module so their automated TV cameras could broadcast the Apollo ascent stages blasting back into space. The rovers stayed behind, their cameras permanently facing home.',
    tag: 'Best Parking Spot Ever',
  },
  {
    page: 10,
    image: '/story/apollo-lrv/page10.png',
    act: 'Page 10: The Next Generation',
    title: 'Your Turn to Explore!',
    sol: 'Present & Beyond • Artemis Era',
    distance: 'Artemis & Mars Horizon',
    caption:
      'Three rovers, three amazing adventures. The Moon Rover began with engineers who dared to imagine putting wheels on the Moon. Today, the Artemis program and Mars rovers continue the journey—what will you discover next?',
    tag: 'What Will You Discover?',
  },
];

const VIKING_COMIC_PAGES = [
  {
    page: 1,
    image: '/story/viking1/page1.png',
    act: 'Page 1: Red Planet Secrets',
    title: 'The Mystery of the Red Planet',
    sol: 'Earth Telescopes • The Quest for Mars',
    distance: 'Telescopic Observation',
    caption:
      'For many years, Mars was a big mystery. Looking up through telescopes, scientists asked: Why does it look red? What is the surface really like? Could life exist on Mars? Humanity set out to find the answers.',
    tag: 'The Mystery of Mars',
  },
  {
    page: 2,
    image: '/story/viking1/page2.png',
    act: 'Page 2: Twin Craft',
    title: 'Meet Viking 1!',
    sol: 'Dual Spacecraft Architecture',
    distance: 'Orbiter & Lander Pair',
    caption:
      'NASA built Viking 1 with two revolutionary parts: an Orbiter to photograph the planet and relay communications, and a robotic Lander designed as a self-contained scientific laboratory to sit directly on Mars.',
    tag: 'Orbiter & Lander Pair',
  },
  {
    page: 3,
    image: '/story/viking1/page3.png',
    act: 'Page 3: Launch',
    title: 'Blast Off to Mars!',
    sol: 'August 20, 1975 • Cape Canaveral',
    distance: 'Titan IIIE-Centaur Rocket',
    caption:
      'On August 20, 1975, a mighty Titan IIIE-Centaur rocket roared to life at Cape Canaveral, blasting Viking 1 into space on a high-stakes 10-month journey toward the Red Planet.',
    tag: 'Titan IIIE Launch',
  },
  {
    page: 4,
    image: '/story/viking1/page4.png',
    act: 'Page 4: Deep Space Cruise',
    title: 'A Long Space Adventure',
    sol: '1975 - 1976 • 304 Days in Flight',
    distance: 'Millions of Kilometers',
    caption:
      'Viking 1 traveled through space for 304 days, traversing millions of kilometers across the inner solar system, getting closer to Mars every single day.',
    tag: '304-Day Voyage',
  },
  {
    page: 5,
    image: '/story/viking1/page5.png',
    act: 'Page 5: Orbital Reconnaissance',
    title: 'Finding a Safe Home',
    sol: 'June 19, 1976 • Mars Orbit Insertion',
    distance: 'Chryse Planitia Target',
    caption:
      'Viking 1 entered Mars orbit on June 19, 1976. The original July 4 landing zone looked too rugged and dangerous, so careful planning led NASA to choose a safer location: Chryse Planitia (The Golden Plain).',
    tag: 'Chryse Planitia Chosen',
  },
  {
    page: 6,
    image: '/story/viking1/page6.png',
    act: 'Page 6: Touchdown',
    title: 'The Great Mars Landing!',
    sol: 'July 20, 1976 • 11:53 UTC',
    distance: 'Chryse Planitia, Mars',
    caption:
      'Lander separation, atmospheric heat shield entry, parachute deceleration, and descent rocket burns! Viking 1 touched down successfully on Mars, its historic signal reaching Earth after a 19-minute space journey.',
    tag: 'First Mars Soft Landing',
  },
  {
    page: 7,
    image: '/story/viking1/page7.png',
    act: 'Page 7: First Martian Photo',
    title: 'Hello, Earth!',
    sol: 'Sol 0 • 25 Seconds After Landing',
    distance: 'Direct Surface View',
    caption:
      'Just 25 seconds after touching down, Viking 1 took the first-ever photograph from the surface of Mars. For the first time in human history, humans saw red rocks and dusty soil at ground level under an alien sky.',
    tag: 'First Photo from Surface',
  },
  {
    page: 8,
    image: '/story/viking1/page8.png',
    act: 'Page 8: Automated Biology Lab',
    title: 'The Great Martian Mystery',
    sol: 'Sol 8 • Soil Sample Experiments',
    distance: '3 Biological Tests',
    caption:
      'Viking 1 used its robotic arm to scoop soil samples into three onboard biological test chambers. While the results showed remarkable chemical reactivity, questions of Martian life remain one of science\'s greatest quests.',
    tag: 'Martian Soil Chemistry',
  },
  {
    page: 9,
    image: '/story/viking1/page9.png',
    act: 'Page 9: Surviving the Red Planet',
    title: 'A Robot That Never Gave Up',
    sol: '1976 - 1982 • Over 6 Years of Science',
    distance: '2,245 Sols of Weather & Data',
    caption:
      'Engineered to operate for 90 days, Viking 1 worked tirelessly for over 6 years! It monitored temperature, wind, and atmospheric pressure through changing Martian seasons, sending thousands of pictures back to Earth.',
    tag: 'Over 6 Years on Mars',
  },
  {
    page: 10,
    image: '/story/viking1/page10.png',
    act: 'Page 10: The Eternal Base',
    title: 'A Footprint That Remains',
    sol: 'November 11, 1982 • Chryse Planitia',
    distance: 'Photographed from Orbit in 2006',
    caption:
      'Viking 1 completed its final transmission on November 11, 1982, but it still stands in Chryse Planitia today. As humanity\'s first permanent outpost on Mars, it proved we could reach another world and inspired future generations.',
    tag: 'First Permanent Outpost',
  },
];

const INSIGHT_COMIC_PAGES = [
  {
    page: 1,
    image: '/story/insight/page1.png',
    act: 'Page 1: Red Planet Mysteries',
    title: 'The Mysterious Heart of Mars',
    sol: 'Planetary Geophysics Objective',
    distance: 'Planetary Core Exploration',
    caption:
      'For many years, Mars has been a mystery. Scientists wanted to know what lies deep inside the Red Planet: its crust, mantle, and core. NASA sent a unique explorer with super-sensitive ears: InSight!',
    tag: 'The Heart of Mars',
  },
  {
    page: 2,
    image: '/story/insight/page2.png',
    act: 'Page 2: Listening Post',
    title: 'Meet InSight — The Robot With Super Ears!',
    sol: 'Geophysical Payload Architecture',
    distance: 'SEIS & HP3 Science Deck',
    caption:
      'InSight is a stationary lander. It does not roam like a rover, but stays in one place to detect ground vibrations. Equipped with circular solar panels, a robotic arm, the SEIS seismometer dome, and heat probes, it was built to listen to Mars.',
    tag: 'Robot with Super Ears',
  },
  {
    page: 3,
    image: '/story/insight/page3.png',
    act: 'Page 3: Launch',
    title: 'Blast Off to Mars!',
    sol: 'May 5, 2018 • Vandenberg Air Force Base',
    distance: 'Atlas V Rocket',
    caption:
      'On May 5, 2018, InSight launched from Vandenberg Air Force Base in California atop a roaring Atlas V rocket—the very first interplanetary mission ever to launch from the U.S. West Coast!',
    tag: 'Atlas V Liftoff',
  },
  {
    page: 4,
    image: '/story/insight/page4.png',
    act: 'Page 4: Deep Space Cruise',
    title: 'Seven Months Among the Stars',
    sol: '2018 • 484 Million Kilometers',
    distance: 'MarCO CubeSat Escorts',
    caption:
      'InSight cruised for 7 months across 484 million kilometers of space to reach Mars. Traveling alongside were MarCO-A and MarCO-B, two briefcase-sized CubeSats that relayed real-time data back to Earth during descent.',
    tag: '484M km Journey',
  },
  {
    page: 5,
    image: '/story/insight/page5.png',
    act: 'Page 5: Touchdown',
    title: 'The Great Mars Landing!',
    sol: 'November 26, 2018 • Elysium Planitia',
    distance: 'Smooth Plain Landing Site',
    caption:
      'On November 26, 2018, InSight tore through the Martian atmosphere, unfurled its supersonic parachute, fired descent thrusters, and touched down softly on the smooth, flat red expanse of Elysium Planitia.',
    tag: 'Touchdown at Elysium',
  },
  {
    page: 6,
    image: '/story/insight/page6.png',
    act: 'Page 6: Deploying SEIS',
    title: "Shhh! Let's Listen to Mars!",
    sol: 'Sol 22 • Surface Deployment',
    distance: 'Seismic Wind Shield Dome',
    caption:
      'Using its dexterous robotic arm, InSight carefully placed the SEIS seismometer directly onto Martian soil and covered it with a copper wind-and-thermal shield, creating an ultra-quiet listening dome.',
    tag: 'Seismometer Deployed',
  },
  {
    page: 7,
    image: '/story/insight/page7.png',
    act: 'Page 7: First Marsquake',
    title: 'BEEP! Mars Just Shook!',
    sol: 'April 6, 2019 • Sol 128',
    distance: '1,319 Marsquakes Detected',
    caption:
      'On April 6, 2019, InSight recorded humanity\'s first confirmed marsquake! Over its 4-year lifespan, the lander detected an astonishing 1,319 quakes, proving the Red Planet is geologically active.',
    tag: 'First Marsquake Recorded',
  },
  {
    page: 8,
    image: '/story/insight/page8.png',
    act: 'Page 8: Mapping the Interior',
    title: 'Secrets Beneath the Red Planet',
    sol: 'Crust, Mantle & Liquid Core',
    distance: 'Subsurface Planetary Layers',
    caption:
      'By analyzing how seismic waves reverberate through Mars, InSight mapped the planet\'s internal anatomy: measuring its crust thickness, mantle temperature, and discovering a large, iron-rich liquid core.',
    tag: 'Mapping the Red Core',
  },
  {
    page: 9,
    image: '/story/insight/page9.png',
    act: 'Page 9: Fighting the Dust',
    title: 'The Dusty Robot That Never Gave Up',
    sol: '2018 - 2022 • Over 4 Years Active',
    distance: '1,440 Sols on Mars',
    caption:
      'Over the years, Martian dust slowly settled over InSight\'s solar panels. Engineers cleverly scooped dirt to let the wind blow dust away, keeping the lander operational for more than four full years!',
    tag: '4+ Years of Grit',
  },
  {
    page: 10,
    image: '/story/insight/page10.png',
    act: 'Page 10: Eternal Legacy',
    title: 'The Heartbeat That Lives Forever',
    sol: 'December 15, 2022 • Final Transmission',
    distance: 'Elysium Planitia Listening Post',
    caption:
      'InSight beamed its final message on December 15, 2022. Resting quietly in Elysium Planitia, this gentle robot gave humanity the ability to hear the internal heartbeat of Mars for the very first time.',
    tag: 'Heartbeat of Mars',
  },
];

const COMIC_COLLECTIONS = {
  surveyor: SURVEYOR_COMIC_PAGES,
  lrv: APOLLO_LRV_COMIC_PAGES,
  viking: VIKING_COMIC_PAGES,
  oppy: OPPORTUNITY_COMIC_PAGES,
  insight: INSIGHT_COMIC_PAGES,
};

export default function StorySection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentChapter, setCurrentChapter] = useState(0);
  const [storyMode, setStoryMode] = useState(() =>
    COMIC_COLLECTIONS[HERO_STORIES[0]?.id] ? 'comic' : 'dossier'
  ); // 'comic' | 'dossier'
  const [comicPage, setComicPage] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isComicSpeaking, setIsComicSpeaking] = useState(false);
  const [earnedBadges, setEarnedBadges] = useState(() => {
    try {
      const saved = localStorage.getItem('nasa-mission-badges');
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch {
      return new Set();
    }
  });

  const activeStory = HERO_STORIES[currentIndex];
  const activeComicPages = COMIC_COLLECTIONS[activeStory.id] || null;
  const hasComic = !!activeComicPages;
  const ActiveIcon = activeStory.icon;
  const activeChapterData = activeStory.chapters[currentChapter];
  const HardwareIcon = activeChapterData.hardwareIcon;
  const isBadgeEarned = earnedBadges.has(activeStory.id);

  // When changing monument, reset chapter / mode
  const handleMonumentChange = (index) => {
    playQuindarTone(true);
    setCurrentIndex(index);
    setCurrentChapter(0);
    setComicPage(0);
    const selectedStory = HERO_STORIES[index];
    if (COMIC_COLLECTIONS[selectedStory.id]) {
      setStoryMode('comic');
    } else {
      setStoryMode('dossier');
    }
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setIsComicSpeaking(false);
    }
  };

  const handlePrev = () => {
    const nextIdx = currentIndex === 0 ? HERO_STORIES.length - 1 : currentIndex - 1;
    handleMonumentChange(nextIdx);
  };

  const handleNext = () => {
    const nextIdx = currentIndex === HERO_STORIES.length - 1 ? 0 : currentIndex + 1;
    handleMonumentChange(nextIdx);
  };

  const handleChapterSelect = (chapterIdx) => {
    playQuindarTone(true);
    setCurrentChapter(chapterIdx);
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const handlePrevChapter = () => {
    if (currentChapter > 0) {
      playQuindarTone(false);
      setCurrentChapter((prev) => prev - 1);
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
      }
    }
  };

  const handleNextChapter = () => {
    if (currentChapter < activeStory.chapters.length - 1) {
      playQuindarTone(true);
      setCurrentChapter((prev) => prev + 1);
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
      }
    }
  };

  // Toggle voice playback of the robot transmission
  const toggleVoiceLog = () => {
    if (!('speechSynthesis' in window)) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      window.speechSynthesis.cancel();
      playQuindarTone(true);

      const utterance = new SpeechSynthesisUtterance(activeChapterData.radioLog);
      utterance.rate = 0.95;
      utterance.pitch = 0.9;
      utterance.onend = () => {
        setIsSpeaking(false);
        playQuindarTone(false);
      };
      utterance.onerror = () => setIsSpeaking(false);

      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    }
  };

  const handleClaimBadge = (id) => {
    playQuindarTone(true);
    const updated = new Set(earnedBadges);
    if (updated.has(id)) {
      updated.delete(id);
    } else {
      updated.add(id);
    }
    setEarnedBadges(updated);
    try {
      localStorage.setItem('nasa-mission-badges', JSON.stringify([...updated]));
    } catch {
      // localStorage not accessible
    }
  };

  const handlePrevComicPage = () => {
    if (comicPage > 0) {
      playQuindarTone(false);
      setComicPage((prev) => prev - 1);
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
        setIsComicSpeaking(false);
      }
    }
  };

  const handleNextComicPage = () => {
    if (activeComicPages && comicPage < activeComicPages.length - 1) {
      playQuindarTone(true);
      setComicPage((prev) => prev + 1);
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
        setIsComicSpeaking(false);
      }
    }
  };

  const handleSelectComicPage = (idx) => {
    playQuindarTone(true);
    setComicPage(idx);
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsComicSpeaking(false);
    }
  };

  const toggleComicVoice = () => {
    if (!('speechSynthesis' in window) || !activeComicPages) return;
    if (isComicSpeaking) {
      window.speechSynthesis.cancel();
      setIsComicSpeaking(false);
    } else {
      window.speechSynthesis.cancel();
      playQuindarTone(true);
      const curPage = activeComicPages[comicPage];
      const textToRead = `${curPage.title}. ${curPage.caption}`;
      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.rate = 0.95;
      utterance.pitch = 0.95;
      utterance.onend = () => {
        setIsComicSpeaking(false);
        playQuindarTone(false);
      };
      utterance.onerror = () => setIsComicSpeaking(false);
      window.speechSynthesis.speak(utterance);
      setIsComicSpeaking(true);
    }
  };

  // Keyboard navigation for comics and lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsLightboxOpen(false);
        return;
      }
      if (hasComic && storyMode === 'comic') {
        if (e.key === 'ArrowLeft') {
          handlePrevComicPage();
        } else if (e.key === 'ArrowRight') {
          handleNextComicPage();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [hasComic, storyMode, comicPage, isLightboxOpen, activeComicPages]);

  // Lock body scroll and apply comic-lightbox-open class to hide fixed navbar
  useEffect(() => {
    if (isLightboxOpen) {
      document.body.classList.add('comic-lightbox-open');
      document.body.style.overflow = 'hidden';
    } else {
      document.body.classList.remove('comic-lightbox-open');
      document.body.style.overflow = '';
    }
    return () => {
      document.body.classList.remove('comic-lightbox-open');
      document.body.style.overflow = '';
    };
  }, [isLightboxOpen]);

  // Clean up speech synthesis if component unmounts
  useEffect(() => {
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  return (
    <section
      id="story"
      className="relative py-12 xs:py-16 sm:py-24 px-3 xs:px-4 sm:px-6 lg:px-8 z-10"
    >
      <div className="max-w-6xl mx-auto w-full">
        {/* Main Double-Bezel Showcase Container */}
        <div className="relative max-w-6xl mx-auto rounded-2xl xs:rounded-[2.5rem] p-1 xs:p-1.5 ring-1 ring-emerald-500/25 bg-emerald-950/20 backdrop-blur-3xl shadow-[0_0_60px_rgba(16,185,129,0.18)]">
          <div className="relative overflow-hidden rounded-[calc(1rem-0.125rem)] xs:rounded-[calc(2.5rem-0.375rem)] px-3 xs:px-6 sm:px-10 py-8 xs:py-10 sm:py-16 bg-black/75 inner-highlight flex flex-col items-center">
            {/* Flowing Cosmic Nebula Mesh Background */}
            <div className="aurora-mesh-bg" aria-hidden="true" />

            {/* Inner Content Layer */}
            <div className="relative z-10 w-full flex flex-col items-center">
              
              {/* Top Floating Control Bar */}
              <div className="w-full max-w-3xl flex items-center justify-between gap-2 xs:gap-4 mb-6 xs:mb-8 sm:mb-12">
                <div className="flex items-center space-x-1.5 text-[9px] xs:text-[10px] sm:text-xs font-mono uppercase tracking-widest radiant-badge px-2.5 xs:px-3.5 py-1 xs:py-1.5 rounded-full">
                  <Sparkles className="w-3 xs:w-3.5 h-3 xs:h-3.5 text-emerald-400" />
                  <span className="radiant-badge-text font-semibold">Planetary Archive</span>
                </div>

                {/* Center Previous / Next Carousel Controls */}
                <div className="flex items-center space-x-1 xs:space-x-1.5 bg-black/60 border border-white/10 rounded-full p-1 backdrop-blur-xl">
                  <button
                    onClick={handlePrev}
                    className="p-1 xs:p-1.5 rounded-full bg-white/5 hover:bg-emerald-500/20 text-slate-300 hover:text-white transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                    aria-label="Previous Monument"
                  >
                    <ChevronLeft className="w-3.5 xs:w-4 h-3.5 xs:h-4" />
                  </button>
                  <span className="px-1.5 xs:px-2 text-[9px] xs:text-[10px] font-mono text-emerald-400 font-bold">
                    0{currentIndex + 1} / 0{HERO_STORIES.length}
                  </span>
                  <button
                    onClick={handleNext}
                    className="p-1 xs:p-1.5 rounded-full bg-white/5 hover:bg-emerald-500/20 text-slate-300 hover:text-white transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                    aria-label="Next Monument"
                  >
                    <ChevronRight className="w-3.5 xs:w-4 h-3.5 xs:h-4" />
                  </button>
                </div>

                <div className="hidden sm:flex items-center space-x-1.5 text-[10px] font-mono uppercase tracking-widest text-slate-400">
                  <Layers className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Interactive Orbital Arc</span>
                </div>
              </div>

              {/* Orbital Arc Stage (Flanking Squircle Cards around Center Pedestal) */}
              <div className="relative w-full max-w-4xl py-6 sm:py-10 flex flex-col items-center">
                
                {/* Curved Orbital Trajectory Line (SVG Arch) */}
                <svg
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-48 pointer-events-none opacity-40 z-0"
                  viewBox="0 0 800 200"
                  fill="none"
                >
                  <path
                    d="M 50 160 Q 400 -20 750 160"
                    stroke="url(#orbitGradient)"
                    strokeWidth="2"
                    strokeDasharray="6 6"
                  />
                  <defs>
                    <linearGradient id="orbitGradient" x1="0" y1="0" x2="800" y2="0" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#059669" stopOpacity="0.1" />
                      <stop offset="50%" stopColor="#34D399" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#059669" stopOpacity="0.1" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Arc Cards & Center Mount Grid */}
                <div className="relative z-10 w-full flex items-center justify-center gap-2 sm:gap-4 md:gap-7">
                  {HERO_STORIES.map((story, index) => {
                    const isSelected = index === currentIndex;
                    const StoryIcon = story.icon;
                    const hasBadge = earnedBadges.has(story.id);

                    // Compute curved tilt and elevation offsets along parabolic arc
                    const diff = index - 2;
                    let tiltClass = 'rotate-0 translate-y-0';
                    if (diff === -2) tiltClass = '-rotate-12 translate-y-8 sm:translate-y-12';
                    if (diff === -1) tiltClass = '-rotate-6 translate-y-2 sm:translate-y-4';
                    if (diff === 1) tiltClass = 'rotate-6 translate-y-2 sm:translate-y-4';
                    if (diff === 2) tiltClass = 'rotate-12 translate-y-8 sm:translate-y-12';

                    return (
                      <button
                        key={story.id}
                        onClick={() => handleMonumentChange(index)}
                        className={`group relative flex flex-col items-center justify-center transition-all duration-500 ease-vanguard cursor-pointer select-none ${tiltClass} ${
                          isSelected
                            ? 'scale-110 sm:scale-120 z-20'
                            : 'scale-90 sm:scale-100 opacity-70 hover:opacity-100 hover:scale-95 sm:hover:scale-105 z-10'
                        }`}
                        aria-label={`Select ${story.hero}`}
                      >
                        {/* Squircle Card Container */}
                        <div
                          className={`w-14 h-14 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-2xl sm:rounded-3xl p-2 sm:p-3 flex flex-col items-center justify-center transition-all duration-500 relative ${
                            isSelected
                              ? 'bg-gradient-to-b from-white/20 to-white/5 border-2 border-emerald-400 shadow-[0_0_35px_rgba(52,211,153,0.5)] backdrop-blur-2xl'
                              : 'bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 shadow-xl backdrop-blur-md'
                          }`}
                        >
                          {/* Mini Badge Pin Indicator */}
                          {hasBadge && (
                            <span className="absolute -top-1 -right-1 sm:-top-1.5 sm:-right-1.5 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-amber-400 border border-black text-[9px] sm:text-[10px] flex items-center justify-center shadow-[0_0_8px_rgba(251,191,36,0.8)] text-slate-950 font-bold">
                              ★
                            </span>
                          )}

                          <div
                            className={`w-7 h-7 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl flex items-center justify-center transition-all duration-300 ${
                              isSelected
                                ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-400/40 shadow-[0_0_15px_rgba(52,211,153,0.4)]'
                                : 'bg-white/5 text-slate-300 group-hover:text-emerald-300 border border-white/10'
                            }`}
                          >
                            <StoryIcon className="w-4 h-4 sm:w-6 sm:h-6" strokeWidth={1.5} />
                          </div>

                          {/* Mini Hardware Name */}
                          <span
                            className={`mt-1 sm:mt-1.5 text-[8px] sm:text-[10px] font-mono tracking-tight uppercase truncate max-w-full text-center ${
                              isSelected
                                ? 'text-emerald-300 font-bold drop-shadow-[0_0_8px_rgba(52,211,153,0.6)]'
                                : 'text-slate-400'
                            }`}
                          >
                            {story.shortName}
                          </span>
                        </div>

                        {/* Active Selection Glow Beacon */}
                        {isSelected && (
                          <div className="absolute -bottom-2 w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.9)] animate-pulse" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Central Celestial Pedestal Summit */}
                <div className="relative mt-8 sm:mt-12 flex flex-col items-center">
                  
                  {/* Floating Holographic Hardware Badge */}
                  <div className="relative z-10 flex flex-col items-center">
                    <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-full bg-gradient-to-b from-emerald-950/90 via-black to-emerald-950/60 border-2 border-emerald-400/50 flex items-center justify-center shadow-[0_0_40px_rgba(52,211,153,0.35)] relative overflow-hidden group">
                      <div className="absolute inset-0 bg-radial-gradient from-emerald-400/20 to-transparent pointer-events-none" />
                      <ActiveIcon className="w-9 h-9 sm:w-13 sm:h-13 text-emerald-300 animate-[spin_40s_linear_infinite]" strokeWidth={1.5} />
                    </div>

                    {/* Celestial Pedestal Peak Base */}
                    <div className="w-36 sm:w-56 h-10 sm:h-14 -mt-5 bg-gradient-to-t from-emerald-950/70 via-emerald-900/40 to-transparent rounded-t-[2.5rem] border-t border-emerald-400/30 shadow-[0_-10px_25px_rgba(52,211,153,0.2)] flex items-end justify-center pb-2">
                      <span className="text-[9px] font-mono uppercase tracking-[0.25em] text-emerald-400 font-bold opacity-80">
                        {activeStory.world} Surface Peak
                      </span>
                    </div>

                    {/* Floating Telemetry Tag */}
                    <div className="-mt-3.5 z-20 px-4 py-2 rounded-2xl bg-white text-slate-950 shadow-[0_10px_25px_rgba(0,0,0,0.5)] border border-white/80 flex items-center space-x-2 transition-transform duration-300 hover:scale-105">
                      <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" strokeWidth={2} />
                      <span className="text-xs font-mono font-extrabold tracking-wide text-slate-900">
                        {activeStory.tag}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Grand Editorial Headline */}
                <div className="text-center mt-8 sm:mt-10 mb-4 sm:mb-6">
                  <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold font-display uppercase tracking-tight leading-[1.08] radiant-headline">
                    Choose Your Monument
                  </h2>
                  <p className="mt-2 text-xs sm:text-sm font-mono tracking-widest uppercase radiant-subhead font-medium">
                    {activeStory.hero} | {activeStory.location}
                  </p>
                </div>
              </div>

              {/* Mode Switcher Tabs for Opportunity, Apollo LRV or Other Monuments */}
              <div className="w-full max-w-5xl flex items-center justify-center my-6">
                <div className="p-1 rounded-2xl bg-black/60 border border-white/10 backdrop-blur-xl flex flex-wrap items-center justify-center gap-1.5 shadow-xl">
                  {hasComic && activeComicPages ? (
                    <button
                      onClick={() => {
                        playQuindarTone(true);
                        setStoryMode('comic');
                      }}
                      className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-mono font-bold transition-all duration-300 flex items-center space-x-2 cursor-pointer ${
                        storyMode === 'comic'
                          ? 'bg-emerald-500/25 text-emerald-300 border border-emerald-400/50 shadow-[0_0_20px_rgba(52,211,153,0.35)]'
                          : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
                      }`}
                    >
                      <BookOpen className="w-4 h-4 text-emerald-400" />
                      <span>Illustrated Comic ({activeComicPages.length} Pages)</span>
                      <span className="ml-1 text-[9px] px-1.5 py-0.5 rounded-full bg-emerald-400 text-slate-950 font-extrabold uppercase tracking-wide">
                        Graphic Novel
                      </span>
                    </button>
                  ) : (
                    <div className="px-3 py-1.5 rounded-xl text-xs font-mono text-slate-500 flex items-center space-x-1.5">
                      <BookOpen className="w-3.5 h-3.5 opacity-50" />
                      <span>Comic Edition (Coming Soon)</span>
                    </div>
                  )}

                  <button
                    onClick={() => {
                      playQuindarTone(true);
                      setStoryMode('dossier');
                    }}
                    className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-mono font-bold transition-all duration-300 flex items-center space-x-2 cursor-pointer ${
                      storyMode === 'dossier'
                        ? 'bg-emerald-500/25 text-emerald-300 border border-emerald-400/50 shadow-[0_0_20px_rgba(52,211,153,0.35)]'
                        : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
                    }`}
                  >
                    <Radio className="w-4 h-4 text-emerald-400" />
                    <span>Mission Dossier &amp; Telemetry</span>
                  </button>
                </div>
              </div>

              {/* Connected Detailed Mission Dossier / Comic Bento Block */}
              <div
                className={`w-full ${
                  storyMode === 'comic' && hasComic
                    ? 'max-w-2xl sm:max-w-3xl lg:max-w-4xl mx-auto'
                    : 'max-w-5xl'
                } grid grid-cols-12 gap-4 sm:gap-6 items-stretch`}
              >
                
                {storyMode === 'comic' && hasComic && activeComicPages ? (
                  /* ================= COMIC READER (FULL WIDTH) ================= */
                  <div className="col-span-12 rounded-[2rem] p-1.5 ring-1 ring-emerald-500/25 bg-emerald-950/20 backdrop-blur-2xl shadow-xl">
                    <div className="h-full rounded-[calc(2rem-0.375rem)] p-3 sm:p-5 md:p-5 bg-black/85 inner-highlight flex flex-col justify-between">
                      <div>
                        {/* Comic Header Strip */}
                        <div className="flex flex-wrap items-center justify-between gap-2.5 pb-3 border-b border-white/10 mb-3">
                          <div className="flex items-center space-x-2.5 sm:space-x-3">
                            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl sm:rounded-2xl bg-emerald-950/80 border border-emerald-400/30 flex items-center justify-center text-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.25)] shrink-0">
                              <BookOpen className="w-4 h-4 sm:w-4.5 sm:h-4.5" strokeWidth={1.5} />
                            </div>
                            <div>
                              <div className="flex items-center space-x-2">
                                <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-bold">
                                  {activeComicPages[comicPage].act}
                                </span>
                                <span className="text-slate-500 text-[10px]">•</span>
                                <span className="text-[10px] font-mono text-slate-400">
                                  {activeComicPages[comicPage].sol}
                                </span>
                              </div>
                              <h3 className="text-base sm:text-lg md:text-xl font-bold font-display text-white">
                                {activeComicPages[comicPage].title}
                              </h3>
                            </div>
                          </div>

                          <div className="flex flex-wrap items-center gap-2">
                            {/* Previous / Next Page Inline Switcher */}
                            <div className="flex items-center space-x-1 bg-black/60 border border-white/10 rounded-full p-1 backdrop-blur-xl">
                              <button
                                onClick={handlePrevComicPage}
                                disabled={comicPage === 0}
                                className="p-1 rounded-full bg-white/5 hover:bg-emerald-500/20 disabled:opacity-30 disabled:cursor-not-allowed text-slate-300 hover:text-white transition-all cursor-pointer"
                                aria-label="Previous Comic Page"
                              >
                                <ChevronLeft className="w-3.5 h-3.5" />
                              </button>
                              <span className="px-1.5 text-[10px] font-mono text-emerald-400 font-bold">
                                {(comicPage + 1).toString().padStart(2, '0')} / {activeComicPages.length.toString().padStart(2, '0')}
                              </span>
                              <button
                                onClick={handleNextComicPage}
                                disabled={comicPage === activeComicPages.length - 1}
                                className="p-1 rounded-full bg-white/5 hover:bg-emerald-500/20 disabled:opacity-30 disabled:cursor-not-allowed text-slate-300 hover:text-white transition-all cursor-pointer"
                                aria-label="Next Comic Page"
                              >
                                <ChevronRight className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            {/* Stamp Badge Button */}
                            <button
                              onClick={() => handleClaimBadge(activeStory.id)}
                              className={`px-3 py-1.5 rounded-full border text-[10px] font-mono font-bold uppercase tracking-wider transition-all flex items-center space-x-1.5 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${
                                isBadgeEarned
                                  ? 'bg-amber-400/20 border-amber-400/50 text-amber-300 shadow-[0_0_10px_rgba(251,191,36,0.3)]'
                                  : 'bg-amber-400 text-slate-950 hover:bg-amber-300 border-amber-300 shadow-[0_0_15px_rgba(251,191,36,0.4)]'
                              }`}
                              title={`Stamp ${activeStory.badge} Badge`}
                            >
                              <Award className="w-3.5 h-3.5" />
                              <span>{isBadgeEarned ? 'Badge Stamped' : 'Stamp Badge'}</span>
                            </button>
                          </div>
                        </div>

                        {/* Central Comic Display Stage */}
                        <div className="relative group rounded-2xl overflow-hidden bg-slate-950/80 border border-emerald-500/25 shadow-2xl flex items-center justify-center p-1.5 sm:p-2.5">
                          <img
                            src={activeComicPages[comicPage].image}
                            alt={activeComicPages[comicPage].title}
                            className="h-auto max-h-[460px] sm:max-h-[500px] md:max-h-[520px] lg:max-h-[540px] max-w-full mx-auto object-contain rounded-xl select-none transition-transform duration-300 group-hover:scale-[1.005] cursor-pointer shadow-2xl"
                            style={{ maxHeight: 'min(530px, 58vh)' }}
                            onClick={() => setIsLightboxOpen(true)}
                            loading="eager"
                          />

                          {/* Hover Zoom Prompt */}
                          <button
                            onClick={() => setIsLightboxOpen(true)}
                            className="absolute top-3 right-3 bg-black/75 hover:bg-black/95 border border-white/20 text-white p-2 rounded-xl backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer shadow-lg"
                            aria-label="Enlarge Comic Page"
                          >
                            <Maximize2 className="w-4 h-4 text-emerald-400" />
                          </button>

                          {/* Left/Right Click Nav Arrows */}
                          {comicPage > 0 && (
                            <button
                              onClick={handlePrevComicPage}
                              className="absolute left-2.5 top-1/2 -translate-y-1/2 p-2 sm:p-2.5 rounded-full bg-black/75 hover:bg-emerald-950/90 border border-white/20 text-white backdrop-blur-md opacity-80 sm:opacity-90 hover:opacity-100 transition-all duration-200 cursor-pointer shadow-xl hover:scale-110"
                              aria-label="Previous Page"
                            >
                              <ChevronLeft className="w-4 sm:w-5 h-4 sm:h-5 text-emerald-400" />
                            </button>
                          )}

                          {comicPage < activeComicPages.length - 1 && (
                            <button
                              onClick={handleNextComicPage}
                              className="absolute right-2.5 top-1/2 -translate-y-1/2 p-2 sm:p-2.5 rounded-full bg-black/75 hover:bg-emerald-950/90 border border-white/20 text-white backdrop-blur-md opacity-80 sm:opacity-90 hover:opacity-100 transition-all duration-200 cursor-pointer shadow-xl hover:scale-110"
                              aria-label="Next Page"
                            >
                              <ChevronRight className="w-4 sm:w-5 h-4 sm:h-5 text-emerald-400" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* ================= 3-CHAPTER TECHNICAL MISSION DOSSIER ================= */
                  <div className="col-span-12 lg:col-span-8 rounded-[2rem] p-1.5 ring-1 ring-emerald-500/25 bg-emerald-950/20 backdrop-blur-2xl shadow-xl">
                    <div className="h-full rounded-[calc(2rem-0.375rem)] p-6 sm:p-8 bg-black/80 inner-highlight flex flex-col justify-between">
                      <div>
                        {/* Top Header Strip */}
                        <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-white/10 mb-5">
                          <div className="flex items-center space-x-3.5">
                            <div className="w-10 h-10 rounded-2xl bg-emerald-950/80 border border-emerald-400/30 flex items-center justify-center text-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.25)]">
                              <ActiveIcon className="w-5 h-5" strokeWidth={1.5} />
                            </div>
                            <div>
                              <span className="text-[10px] font-mono uppercase tracking-widest block radiant-badge-text font-semibold">
                                Destination World: {activeStory.world}
                              </span>
                              <h3 className="text-lg sm:text-xl font-bold font-display radiant-headline">
                                {activeStory.title}
                              </h3>
                            </div>
                          </div>

                          <span className="text-[10px] font-mono px-3.5 py-1.5 rounded-full radiant-badge radiant-badge-text font-semibold flex items-center gap-1.5">
                            <span>{activeStory.badgeEmoji}</span>
                            <span>{activeStory.badge}</span>
                          </span>
                        </div>

                        {/* 3-Chapter Stepper Header Tabs */}
                        <div className="grid grid-cols-3 gap-2 p-1.5 rounded-2xl bg-white/[0.04] border border-white/10 mb-6">
                          {activeStory.chapters.map((ch, idx) => {
                            const isActive = idx === currentChapter;
                            return (
                              <button
                                key={ch.actNumber}
                                onClick={() => handleChapterSelect(idx)}
                                className={`py-2 px-2 sm:px-3 rounded-xl text-center transition-all duration-300 cursor-pointer flex flex-col items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 ${
                                  isActive
                                    ? 'bg-emerald-500/20 border border-emerald-400/50 shadow-[0_0_15px_rgba(52,211,153,0.3)]'
                                    : 'hover:bg-white/5 border border-transparent text-slate-400 hover:text-slate-200'
                                }`}
                              >
                                <span
                                  className={`text-[8px] sm:text-[9px] font-mono uppercase tracking-wider block font-semibold ${
                                    isActive ? 'text-emerald-400' : 'text-slate-500'
                                  }`}
                                >
                                  {ch.actLabel}
                                </span>
                                <span
                                  className={`text-[10px] sm:text-xs font-display font-bold truncate max-w-full ${
                                    isActive ? 'text-white' : 'text-slate-400'
                                  }`}
                                >
                                  {ch.title.split(':')[1]?.trim() || ch.title}
                                </span>
                              </button>
                            );
                          })}
                        </div>

                        {/* Act Title & Mission Log Card */}
                        <div className="mb-5">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-emerald-400 font-bold">
                              {activeChapterData.actLabel}
                            </span>
                            <span className="text-[10px] font-mono text-slate-500">
                              Act {currentChapter + 1} of 3
                            </span>
                          </div>
                          <h4 className="text-xl sm:text-2xl font-bold font-display text-white mb-3">
                            {activeChapterData.title}
                          </h4>

                          {/* First-Person Radio Telemetry Log Box */}
                          <div className="rounded-2xl bg-black/90 border border-emerald-500/30 p-4 sm:p-5 relative overflow-hidden group">
                            <div className="flex items-center justify-between mb-2.5">
                              <div className="flex items-center space-x-2">
                                <Signal className="w-3.5 h-3.5 text-emerald-400 animate-pulse" strokeWidth={2} />
                                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-emerald-400 font-bold">
                                  Machine Transmission Log
                                </span>
                              </div>

                              {/* Audio Voice Log Toggle */}
                              <button
                                onClick={toggleVoiceLog}
                                className={`px-2.5 py-1 rounded-full border text-[9px] font-mono uppercase tracking-wider transition-all duration-300 flex items-center space-x-1.5 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 ${
                                  isSpeaking
                                    ? 'bg-amber-500/20 border-amber-400/50 text-amber-300 animate-pulse shadow-[0_0_10px_rgba(251,191,36,0.3)]'
                                    : 'bg-white/5 hover:bg-emerald-500/20 border-white/10 text-slate-300 hover:text-white'
                                }`}
                                title={isSpeaking ? 'Stop Transmission Audio' : 'Play Radio Telemetry Audio'}
                              >
                                {isSpeaking ? (
                                  <>
                                    <VolumeX className="w-3 h-3 text-amber-400" />
                                    <span>Stop Voice</span>
                                  </>
                                ) : (
                                  <>
                                    <Volume2 className="w-3 h-3 text-emerald-400" />
                                    <span>Listen to Log</span>
                                  </>
                                )}
                              </button>
                            </div>

                            <p className="text-xs sm:text-sm font-mono text-emerald-300/90 leading-relaxed italic">
                              &gt; "{activeChapterData.radioLog}"
                            </p>
                          </div>
                        </div>

                        {/* Main Narrative Paragraph */}
                        <div className="mb-5">
                          <p className="text-sm sm:text-base text-slate-200 font-sans leading-relaxed">
                            {activeChapterData.story}
                          </p>
                        </div>

                        {/* Hardware Hotspot / Fun Fact Callout Card */}
                        <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/20 flex items-start space-x-3.5">
                          <div className="w-8 h-8 rounded-xl bg-emerald-900/60 border border-emerald-400/30 flex items-center justify-center text-emerald-300 shrink-0 mt-0.5 shadow-[0_0_10px_rgba(52,211,153,0.25)]">
                            <HardwareIcon className="w-4 h-4" strokeWidth={1.5} />
                          </div>
                          <div>
                            <span className="text-[10px] font-mono uppercase tracking-wider block text-emerald-400 font-bold mb-1">
                              Hardware Secret &amp; Discovery
                            </span>
                            <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                              {activeChapterData.funFact}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Stepper Navigation Footer */}
                      <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                        <button
                          onClick={handlePrevChapter}
                          disabled={currentChapter === 0}
                          className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed border border-white/10 text-xs font-mono text-slate-300 hover:text-white transition-all flex items-center space-x-1.5 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                          aria-label="Previous Chapter"
                        >
                          <ArrowLeft className="w-3.5 h-3.5" />
                          <span>Previous Act</span>
                        </button>

                        {/* Center Act Progress Dots */}
                        <div className="flex items-center space-x-2">
                          {activeStory.chapters.map((_, dotIdx) => (
                            <button
                              key={dotIdx}
                              onClick={() => handleChapterSelect(dotIdx)}
                              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                                dotIdx === currentChapter
                                  ? 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)] scale-125'
                                  : 'bg-white/20 hover:bg-white/40'
                              }`}
                              aria-label={`Jump to Act ${dotIdx + 1}`}
                            />
                          ))}
                        </div>

                        {currentChapter < activeStory.chapters.length - 1 ? (
                          <button
                            onClick={handleNextChapter}
                            className="px-4 py-2 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-400/40 text-xs font-mono font-bold text-emerald-300 hover:text-white transition-all flex items-center space-x-1.5 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.2)]"
                            aria-label="Next Chapter"
                          >
                            <span>Next Act</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        ) : (
                          <button
                            onClick={() => handleClaimBadge(activeStory.id)}
                            className={`px-4 py-2 rounded-xl border text-xs font-mono font-bold uppercase tracking-wider transition-all flex items-center space-x-1.5 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${
                              isBadgeEarned
                                ? 'bg-amber-400/20 border-amber-400/50 text-amber-300 shadow-[0_0_15px_rgba(251,191,36,0.3)]'
                                : 'bg-amber-400 text-slate-950 hover:bg-amber-300 border-amber-300 shadow-[0_0_20px_rgba(251,191,36,0.5)]'
                            }`}
                            aria-label="Stamp Flight Log"
                          >
                            <Award className="w-3.5 h-3.5" />
                            <span>{isBadgeEarned ? 'Badge Stamped!' : 'Stamp Flight Log'}</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Right Column: Telemetry & Milestone Bento Cards (Hidden when viewing Comic) */}
                {!(storyMode === 'comic' && hasComic) && (
                  <div className="col-span-12 lg:col-span-4 flex flex-col space-y-6">
                    
                    {/* Telemetry Card 1: Coordinates */}
                    <div className="rounded-[2rem] p-1.5 ring-1 ring-emerald-500/25 bg-emerald-950/20 backdrop-blur-2xl shadow-xl flex-1">
                      <div className="h-full rounded-[calc(2rem-0.375rem)] p-6 bg-black/80 inner-highlight flex flex-col justify-between">
                        <div>
                          <div className="w-8 h-8 rounded-xl bg-emerald-950/80 border border-emerald-400/30 flex items-center justify-center text-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.25)] mb-4">
                            <MapPin className="w-4 h-4" strokeWidth={1.5} />
                          </div>
                          <span className="text-[10px] font-mono uppercase tracking-widest block mb-1 radiant-badge-text font-semibold">
                            Resting Coordinates
                          </span>
                          <div className="text-sm sm:text-base font-bold font-sans radiant-headline">
                            {activeStory.location}
                          </div>
                        </div>
                        <div className="text-[11px] font-mono pt-4 border-t border-white/5 radiant-badge-text font-medium">
                          Permanent Solar Surface Archive
                        </div>
                      </div>
                    </div>

                    {/* Telemetry Card 2: Lifespan & Odometer */}
                    <div className="rounded-[2rem] p-1.5 ring-1 ring-emerald-500/25 bg-emerald-950/20 backdrop-blur-2xl shadow-xl flex-1">
                      <div className="h-full rounded-[calc(2rem-0.375rem)] p-6 bg-black/80 inner-highlight flex flex-col justify-between">
                        <div>
                          <div className="w-8 h-8 rounded-xl bg-emerald-950/80 border border-emerald-400/30 flex items-center justify-center text-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.25)] mb-4">
                            <Orbit className="w-4 h-4" strokeWidth={1.5} />
                          </div>
                          <span className="text-[10px] font-mono uppercase tracking-widest block mb-1 radiant-badge-text font-semibold">
                            Operational Lifespan
                          </span>
                          <div className="text-sm sm:text-base font-bold font-sans mb-1 radiant-headline">
                            {activeStory.lifespan}
                          </div>
                          <div className="text-xs text-slate-300 font-mono">
                            Traverse: {activeStory.odometer}
                          </div>
                        </div>
                        <div className="text-[11px] font-mono pt-4 border-t border-white/5 radiant-badge-text font-medium">
                          Documented Planetary Milestone
                        </div>
                      </div>
                    </div>

                    {/* Telemetry Card 3: Interactive Mission Badge & Flight Log Stamper */}
                    <div className="rounded-[2rem] p-1.5 ring-1 ring-emerald-500/25 bg-emerald-950/20 backdrop-blur-2xl shadow-xl">
                      <div className="rounded-[calc(2rem-0.375rem)] p-6 bg-black/80 inner-highlight flex flex-col items-center text-center">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400/20 to-emerald-500/20 border border-amber-400/40 flex items-center justify-center text-3xl mb-3 shadow-[0_0_20px_rgba(251,191,36,0.3)]">
                          {activeStory.badgeEmoji}
                        </div>
                        <span className="text-[9px] font-mono uppercase tracking-widest text-amber-400 font-bold mb-1">
                          Official Mission Badge
                        </span>
                        <h5 className="text-sm font-bold font-display text-white mb-3">
                          {activeStory.badge}
                        </h5>

                        <button
                          onClick={() => handleClaimBadge(activeStory.id)}
                          className={`w-full py-2.5 px-4 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 ${
                            isBadgeEarned
                              ? 'bg-emerald-500/20 border border-emerald-400/50 text-emerald-300 shadow-[0_0_15px_rgba(52,211,153,0.3)]'
                              : 'bg-white/10 hover:bg-emerald-400 hover:text-emerald-950 border border-white/20 text-white'
                          }`}
                          aria-label={`Stamp ${activeStory.badge} Flight Log`}
                        >
                          {isBadgeEarned ? (
                            <>
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                              <span>Flight Log Stamped!</span>
                            </>
                          ) : (
                            <>
                              <Award className="w-3.5 h-3.5" />
                              <span>Stamp Flight Log</span>
                            </>
                          )}
                        </button>

                        <div className="mt-3 flex items-center justify-center space-x-1.5 text-[9px] font-mono text-slate-400">
                          <Sparkles className="w-3 h-3 text-amber-400" />
                          <span>{earnedBadges.size} of {HERO_STORIES.length} Badges Collected</span>
                        </div>
                      </div>
                    </div>

                  </div>
                )}

              </div>

            </div>
          </div>
        </div>
      </div>
      {/* Fullscreen High-Resolution Lightbox Modal via Portal to document.body */}
      {isLightboxOpen && hasComic && activeComicPages && typeof document !== 'undefined' &&
        createPortal(
          <div
            className="fixed inset-0 z-[9999] bg-[#030712] flex flex-col items-center justify-between p-3 sm:p-6 select-none"
            role="dialog"
            aria-modal="true"
            onClick={() => setIsLightboxOpen(false)}
          >
            {/* Top Control Bar */}
            <div
              className="w-full max-w-5xl flex items-center justify-between pb-3 border-b border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center space-x-3">
                <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold">
                  Page {(comicPage + 1).toString().padStart(2, '0')} of {activeComicPages.length.toString().padStart(2, '0')}
                </span>
                <span className="text-slate-500">•</span>
                <span className="text-sm sm:text-base font-bold font-display text-white">
                  {activeComicPages[comicPage].title}
                </span>
              </div>

              <div className="flex items-center space-x-3">
                <span className="hidden md:inline text-[11px] font-mono text-slate-400">
                  ← / → keys to flip • Esc to close
                </span>
                <button
                  onClick={() => setIsLightboxOpen(false)}
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white cursor-pointer transition-all border border-white/10 hover:scale-105"
                  aria-label="Close Lightbox"
                >
                  <X className="w-5 h-5 text-slate-200" />
                </button>
              </div>
            </div>

            {/* Main Comic Image & Floating Navigation */}
            <div
              className="relative flex-1 w-full max-w-5xl flex items-center justify-center my-2 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={activeComicPages[comicPage].image}
                alt={activeComicPages[comicPage].title}
                className="max-h-[70vh] sm:max-h-[72vh] w-auto max-w-full object-contain rounded-2xl shadow-2xl ring-1 ring-emerald-500/30"
              />

              {comicPage > 0 && (
                <button
                  onClick={handlePrevComicPage}
                  className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-3 sm:p-4 rounded-full bg-black/80 hover:bg-emerald-950 border border-white/20 text-emerald-400 backdrop-blur-md cursor-pointer transition-all shadow-2xl hover:scale-110"
                  aria-label="Previous Page"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
              )}

              {comicPage < activeComicPages.length - 1 && (
                <button
                  onClick={handleNextComicPage}
                  className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-3 sm:p-4 rounded-full bg-black/80 hover:bg-emerald-950 border border-white/20 text-emerald-400 backdrop-blur-md cursor-pointer transition-all shadow-2xl hover:scale-110"
                  aria-label="Next Page"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              )}
            </div>

            {/* Bottom Caption & Progress in Lightbox */}
            <div
              className="w-full max-w-3xl text-center pb-2"
              onClick={(e) => e.stopPropagation()}
            >
              <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed mb-2">
                {activeComicPages[comicPage].caption}
              </p>
              <div className="flex items-center justify-center space-x-1.5">
                {activeComicPages.map((_, dotIdx) => (
                  <button
                    key={dotIdx}
                    onClick={() => handleSelectComicPage(dotIdx)}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                      dotIdx === comicPage
                        ? 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)] scale-125'
                        : 'bg-white/20 hover:bg-white/40'
                    }`}
                    aria-label={`Jump to Page ${dotIdx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>,
          document.body
        )}
    </section>
  );
}
