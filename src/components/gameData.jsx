// This file contains all the static data for the game:
// - Chess piece attributes and associated questions
// - List of all potential Succinct members (placeholders for now)

import Uma from "../assets/uma_ceo.jpg"
import Yinger from '../assets/Yinger2.png'
import Stepaks from '../assets/stepakks.jpg'
import Addy from '../assets/Advaith3.jpg'
import Enspire from '../assets/Enspire.jpg'
import Saigon from '../assets/saigon.gif'
import Zarh0n from '../assets/zarhon.jpg'
import ZkDan from '../assets/zkdan.jpg'
import Shalen from '../assets/salen.jpg'
import Pix from '../assets/pix.jpg'
import Jason from '../assets/jason.jpg'
import Oluseyi from '../assets/Oluseyi.jpg'
import Tuong from '../assets/tuong.jpg'
import Bugs from '../assets/bugs.jpg'
import Coco from '../assets/coco.jpg'
import Wylo from '../assets/Wylo.jpg'
import Mvkise from '../assets/mvkise.jpg'
import Cryptomeii from '../assets/cryptomeii.jpg'
import Fake from '../assets/fake.jpg'
import Ljngljng from '../assets/Lqueen.jpg'


// Succinct Chess Challenge Base Questions
// Each piece type now has an array of potential questions.
// This allows for dynamic selection of multiple instances of the same piece type.
export const baseGameQuestions = {
    King: [
        {
            id: 'q-king-1',
            piece: 'King',
            attributes: [
                "Holds the grand vision of Succinct's future.",
  "Guides strategic decisions with wisdom and resolve.",
  "Depends on the team’s loyalty and coordination.",
  "Embodies executive leadership and inspires all roles to align."
            ],
            question: 'Which member best fits the King',
            rotationClass: 'rotate-y',
        },
    ],
    Queen: [
        {
            id: 'q-queen-1',
            piece: 'Queen',
            attributes: [
                "Wields power across development, community, and creative fronts.",
  "Leads initiatives and adapts to any challenge.",
  "Delivers impact swiftly from backend to brand.",
  "Symbolizes versatility, capable of filling any role — all-in-one."
            ],
            question: 'Which member best fits the Queen role?',
            rotationClass: 'rotate-x',
        },
    ],
    Rook: [
        {
            id: 'q-rook-1',
            piece: 'Rook',
            attributes: [

               "Builds and protects Succinct’s infrastructure from the ground up.",
  "Delivers reliable, scalable systems and proof tooling.",
  "Holds the line with backend strength and clean code.",
  "A fortress of logic — where every dev stands tall.",
            ],
            question: 'Which member best fits the Rook role?',
            rotationClass: 'rotate-z',
        },
        {
            id: 'q-rook-2',
            piece: 'Rook',
            attributes: [
               "Stabilizes Succinct’s global presence through structure.",
  "Guides regional teams and events with consistency.",
  "Lays groundwork for future expansion and outreach.",
  "A pillar of localized leadership across the ecosystem."
            ],
            question: 'Which member best fits the Rook role?',
            rotationClass: 'rotate-z',
        },
    ],
    Bishop: [
        {
            id: 'q-bishop-1',
            piece: 'Bishop',
            attributes: [
                "Translates complex ZK concepts into inspiring messages.",
  "Uses words like magic to connect tech with people.",
  "Communicates Succinct’s mission through writing and speaking.",
  "The voice of Succinct — sharp, eloquent, and enlightening."
            ],
            question: 'Which member best fits the Bishop role?',
            rotationClass: 'rotate-y',
        },
        {
            id: 'q-bishop-2',
            piece: 'Bishop',
            attributes: [
              "Moves with grace through the channels of community.",
  "Creates clarity, calm, and cohesion during storms.",
  "Guides engagement and resolves internal conflicts.",
  "Supports members with empathy and leadership energy."
            ],
            question: 'Which member best fits the Bishop role?',
            rotationClass: 'rotate-y',
        },
    ],
    Knight: [
        {
            id: 'q-knight-1',
            piece: 'Knight',
            attributes: [
                "Navigates problems with unique technical creativity.",
  "Jumps over blockers and delivers surprise breakthroughs.",
  "Thrives in chaotic dev spaces and hackathons.",
  "Lively, fast, and inspiring — the builder with a spark."
            ],
            question: 'Which member best fits the Knight role?',
            rotationClass: 'rotate-x',
        },
        {
            id: 'q-knight-2',
            piece: 'Knight',
            attributes: [
                "Unpredictable, bold, and hilariously effective.",
  "Turns memes into morale boosts and engagement spikes.",
  "Disarms tension and sparks conversation through chaos.",
  "The tactical jester who drives community culture forward."
            ],
            question: 'Which member best fits the Knight role?',
            rotationClass: 'rotate-x',
        },
    ],
    Pawn: [
        {
            id: 'q-pawn-1',
            piece: 'Pawn',
            attributes: [
               "Foundational contributor in daily Succinct community life.",
  "Always present, always dependable in support roles.",
  "Steps up to help without seeking spotlight.",
  "The unsung hero — humble, but mighty in impact."
            ],
            question: 'Which member best fits the Pawn role?',
            rotationClass: 'rotate-z',
        },
        {
            id: 'q-pawn-2',
            piece: 'Pawn',
            attributes: [
                "Brings creative flair to the community's look and feel.",
  "Adds color and life through visuals, memes, and designs.",
  "Helps vibe-check channels and spark interactions.",
  "Makes Succinct both beautiful and alive with energy",
            ],
            question: 'Which member best fits the Pawn role?',
            rotationClass: 'rotate-z',
        },
        {
            id: 'q-pawn-3',
            piece: 'Pawn',
            attributes: [
                "First to welcome new members and make them feel seen.",
  "Breaks the ice and helps others settle in.",
  "Explains the ecosystem in a friendly, simple voice.",
  "A natural speaker and vibe setter for fresh faces."
            ],
            question: 'Which member best fits the Pawn role?',
            rotationClass: 'rotate-z',
        },
        {
            id: 'q-pawn-4',
            piece: 'Pawn',
            attributes: [
                "Supports regional growth with consistent presence.",
  "Builds small teams and empowers local contributors.",
  "Bridges global initiatives with local momentum.",
  "Key to grassroots movement — humble and hands-on."
            ],
            question: 'Which member best fits the Pawn role?',
        },
        {
            id: 'q-pawn-5',
            piece: 'Pawn',
            attributes: [
                "Takes notes, shares insights, and learns by doing.",
  "Acts as the voice of early contributors and explorers.",
  "Grows rapidly through content, experiments, and discussion.",
  "On the journey to become a Knight or Bishop someday."
            ],
            question: 'Which member best fits the Pawn role?',
            rotationClass: 'rotate-z',
        },
    ],
};

// Mock data for 20 top Succinct members (replace with your actual PFP assets)
// Using imported images
export const allMembers = [
    { id: 'memberA', name: 'Uma', img: Uma, roles: ['CEO', 'Artist', 'Developer', 'Community Manager', 'Writer','Leader', 'Engager', 'Regional Lead', 'Speaker', 'Shitposter'] },
    { id: 'memberB', name: 'Yinger', img: Yinger, roles: ['Developer', 'Community Manager', 'Writer', 'CEO', 'Engager', 'Regional Lead', 'Speaker', 'Shitposter'] },
    { id: 'memberC', name: 'Addy', img: Addy, roles: ['Artist', 'Developer', 'Writer', 'CEO', 'Engager', 'Regional Lead','Leader', 'Speaker', 'Shitposter'] },
    { id: 'memberD', name: 'Enspire', img: Enspire, roles: ['Developer','Engager', 'Regional Lead','Community Supporter'] },
    { id: 'memberE', name: 'Stepaks', img: Stepaks, roles: ['Regional Lead','Engager', 'Developer','Community Supporter'] },
    { id: 'memberF', name: 'Zarh0n', img: Zarh0n, roles: ['Regional Lead', 'Engager','Community Supporter'] },
    { id: 'memberG', name: 'Saigon', img: Saigon, roles: ['Regional Lead', 'Engager','Community Supporter'] },
    { id: 'memberH', name: 'zKDan', img: ZkDan, roles: ['Community Supporter', 'Engager','Writer', 'Speaker', 'Engager'] }, // Changed to Team Leader
    { id: 'memberI', name: 'Pix', img: Pix, roles: ['Artist', 'Engager','Community Supporter'] },
    { id: 'memberJ', name: 'Jason', img: Jason, roles: ['Writer','Engager', 'Community Supporter'] },
    { id: 'memberK', name: 'Coco', img: Coco, roles: ['Community Supporter','Engager', 'Writer', 'Speaker'] },
    { id: 'memberL', name: 'Bugs', img: Bugs, roles: ['Regional Lead', 'Engager','Community Supporter', 'Developer'] },
    { id: 'memberM', name: 'Oluseyi', img: Oluseyi, roles: ['Community Supporter'] },
    { id: 'memberN', name: 'Shalen', img: Shalen, roles: ['Writer','Engager', 'Community Supporter'] },
    { id: 'memberO', name: 'tuong', img: Tuong, roles: ['Community Supporter','Artist','Engager', 'Shitposter'] },
    { id: 'memberP', name: 'Wylo', img: Wylo, roles: ['Shitposter','Engager', 'Community Supporter'] },
    { id: 'memberQ', name: 'mvkise', img: Mvkise, roles: ['Regional Lead','Engager', 'Community Supporter','Writer',] },
    { id: 'memberR', name: 'cryptomeii', img: Cryptomeii, roles: ['Community Supporter','Engager', 'Regional Lead'] },
    { id: 'memberS', name: 'fake', img: Fake, roles: [ 'Community Supporter','Engager','Writer', 'Speaker'] }, // Changed to Team Leader
    { id: 'memberT', name: 'Ljngljng', img: Ljngljng, roles: ['Artist','Engager', 'Community Supporter'] },
];

// Strategy Test Scenarios
// Each scenario has a prompt and a required role to solve it.
export const strategyTestScenarios = [
    {
        id: 's-art-1',
        prompt: 'Urgent: The community needs a captivating new piece of art for an upcoming announcement! Who are you sending to create it?',
        requiredRole: 'Artist',
    },
    {
        id: 's-dev-1',
        prompt: 'Critical: A sudden bug has been reported in the SP1 system. Who is the best person to deploy to fix it immediately?',
        requiredRole: 'Developer',
    },
    {
        id: 's-community-1',
        prompt: 'Important: There\'s a new wave of members joining Discord, and we need someone to ensure smooth onboarding and role distribution. Who is best suited?',
        requiredRole: 'Community Manager',
    },
    {
        id: 's-writer-1',
        prompt: 'High Priority: A complex ZKP concept needs to be explained in a clear, concise X thread to reach a wider audience. Who should lead this?',
        requiredRole: 'Writer',
    },
    {
        id: 's-leader-1',
        prompt: 'Strategic: We need to establish a new partnership with a major blockchain entity. Who will you send to represent Succinct Labs in this high-level negotiation?',
        requiredRole: 'CEO',
    },
    {
        id: 's-engager-1',
        prompt: 'Community Vibe: A Discord meeting is feeling a bit dull, and we need someone to boost engagement and positive vibes. Who can energize the room?',
        requiredRole: 'Engager',
    },
    {
        id: 's-regional-1',
        prompt: 'Expansion: A new regional community is forming, and they need guidance and support to get started. Who will you assign as their primary contact?',
        requiredRole: 'Regional Lead',
    },
    
    {
        id: 's-dev-2',
        prompt: 'Feature Request: A crucial new feature for an SP1-based application has been requested. Who should be assigned to build this amazing app?',
        requiredRole: 'Developer',
    },
    {
        id: 's-community-2',
        prompt: 'Conflict Resolution: There\'s a minor disagreement in a community channel. Who is best equipped to mediate and resolve the situation smoothly?',
        requiredRole: 'Community Manager',
    },
    {
        id: 's-speaker-1',
        prompt: 'Public Speaking: We need a charismatic member to represent Succinct at an upcoming blockchain conference. Who will you send to deliver the presentation?',
        requiredRole: 'Speaker',
    },
    {
        id: 's-shitposter-1',
        prompt: 'Meme Warfare: The community needs some viral, humorous content to boost engagement on social media. Who is our go-to "shitposter" for this task?',
        requiredRole: 'Shitposter',
    },
    {
        id: 's-community-3',
        prompt: 'New Member Welcome: A new member just joined and seems a bit lost in the channels. Who can jump in, guide them, and make them feel instantly welcome?',
        requiredRole: 'Community Supporter',
    },
    {
        id: 's-content-1',
        prompt: 'Twitter Buzz: Our latest announcement needs to go viral! Who can craft a witty, engaging tweet that captures attention and gets retweets?',
        requiredRole: 'Writer',
    },
    {
        id: 's-fun-1',
        prompt: 'Morale Boost: The team is feeling the grind. Who can organize a quick, fun virtual activity or share something hilarious to lift everyone\'s spirits?',
        requiredRole: 'Engager',
    },
    {
        id: 's-art-2',
        prompt: 'Brand Refresh: Succinct Labs is updating its visual identity. Who will you task with designing a fresh, modern logo that truly represents our vision?',
        requiredRole: 'Artist',
    },
    {
        id: 's-dev-3',
        prompt: 'Security Audit: A critical security vulnerability has been identified in a new smart contract. What will you do to ensure it\'s patched immediately?',
        requiredRole: 'Developer',
    },
    {
        id: 's-community-4',
        prompt: 'Event Planning: We\'re hosting a major online event next month. Who is the best person to coordinate all the logistics and ensure a seamless experience for attendees?',
        requiredRole: 'Community Manager',
    },
    {
        id: 's-writer-2',
        prompt: 'Documentation Gap: A new feature has just launched, but the documentation is lacking. Who can quickly write clear, comprehensive guides for developers?',
        requiredRole: 'Writer',
    },
    {
        id: 's-leader-2',
        prompt: 'Crisis Management: A major FUD campaign is spreading misinformation about ZKPs. Who will step up to address the concerns publicly and restore trust?',
        requiredRole: 'CEO',
    },
    {
        id: 's-engager-2',
        prompt: 'Icebreaker Needed: A new team retreat is starting, and the atmosphere is a bit stiff. Who can break the ice with a fun, interactive activity?',
        requiredRole: 'Engager',
    },
    {
        id: 's-regional-2',
        prompt: 'Local Meetup: Our London community wants to host their first in-person meetup. Who will you send to help them organize and promote the event locally?',
        requiredRole: 'Regional Lead',
    },
    
    {
        id: 's-speaker-2',
        prompt: 'Podcast Guest: A popular blockchain podcast wants to interview someone from Succinct about the future of zkVMs. Who will you choose to represent us?',
        requiredRole: 'Speaker',
    },
    {
        id: 's-shitposter-2',
        prompt: 'Discord Shenanigans: The Discord is a bit quiet. Who can drop a perfectly timed, absurd meme to spark some laughter and engagement?',
        requiredRole: 'Shitposter',
    },
    {
        id: 's-community-5',
        prompt: 'Support Overflow: The support channels are swamped with basic questions. Who can jump in and help new users with their initial queries?',
        requiredRole: 'Community Supporter',
    },
    {
        id: 's-dev-4',
        prompt: 'Optimization Challenge: Our prover network is experiencing minor latency. Who is the genius you\'ll send to optimize the code for maximum efficiency?',
        requiredRole: 'Developer',
    },
    {
        id: 's-writer-3',
        prompt: 'Blog Post Brainstorm: We need fresh ideas for our next blog post on ZKP applications. Who can brainstorm compelling topics and outline engaging content?',
        requiredRole: 'Writer',
    },
    {
        id: 's-engager-3',
        prompt: 'Community Game Night: It\'s Friday night, and the community wants to unwind with a game. Who will you task with organizing and hosting a fun online game session?',
        requiredRole: 'Engager',
    },
    {
        id: 's-leader-3',
        prompt: 'Funding Round: We\'re preparing for a new funding round. Who is the key person you\'ll send to pitch our vision and secure investments from top VCs?',
        requiredRole: 'CEO',
    },
    {
        id: 's-art-3',
        prompt: 'NFT Collection: The community wants to launch an exclusive NFT collection. Who should design the unique and appealing digital art pieces?',
        requiredRole: 'Artist',
    },
    {
        id: 's-regional-3',
        prompt: 'Community Onboarding Kit: A new regional lead needs resources to kickstart their local community. Who will you send to create a comprehensive onboarding kit for them?',
        requiredRole: 'Regional Lead',
    },
    {
        id: 's-team-3',
        prompt: 'Cross-Departmental Sync: Two teams are struggling to align on a project. Who can facilitate a smooth cross-departmental sync to get everyone on the same page?',
        requiredRole: 'Team Leader',
    },
    {
        id: 's-shitposter-3',
        prompt: 'Discord is dull today. Can someone post something truly outlandish and hilarious to get everyone talking and laughing?',
        requiredRole: 'Shitposter',
    },
    {
        id: 's-community-6',
        prompt: 'Ambassador Program: We want to launch a new ambassador program to empower community members. Who is the best person to design and manage this program?',
        requiredRole: 'Community Manager',
    },
    {
        id: 's-dev-5',
        prompt: 'New Protocol Integration: A promising new blockchain protocol needs ZKP integration. Who is the developer you\'ll assign to explore and implement this complex integration?',
        requiredRole: 'Developer',
    },
    {
        id: 's-writer-4',
        prompt: 'Whitepaper Review: Our latest whitepaper draft needs a final, meticulous review for clarity, accuracy, and impact. Who is the writer you\'ll trust with this crucial task?',
        requiredRole: 'Writer',
    },
    {
        id: 's-engager-4',
        prompt: 'Twitter Space Host: We\'re hosting a Twitter Space to discuss the latest ZKP trends. Who has the best speaking vibe and can keep the audience engaged?',
        requiredRole: 'Speaker',
    },
    {
        id: 's-leader-4',
        prompt: 'Visionary Pitch: A major tech giant is interested in ZKPs. Who will you send to deliver a compelling, high-level pitch that showcases Succinct Labs\' long-term vision?',
        requiredRole: 'CEO',
    },
    {
        id: 's-community-7',
        prompt: 'Community Feedback: We need to gather structured feedback from the community on a new feature. Who can design and implement an effective feedback collection process?',
        requiredRole: 'Community Supporter',
    },
];
