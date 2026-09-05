// ── PRACTICE TEMPLATES — one config per sport, same engine for all ──────────────
// Extracted verbatim from backyard-coach/src/components/PracticeBuilder.jsx (2026-08-19
// through 2026-08-23 builds) so the web app AND the native mobile app run the exact same
// tested practice-generation logic — not two copies that can drift apart. Pure JS, no
// React/DOM/RN imports, so it works identically on both platforms.
//
// Every sport plugs into the same buildPlan/getTimesForDuration/getDrillsForStation
// engine below by supplying: stationOrder, stationLabels, stationIcons, timePlans,
// stationCats (station key -> bc_drills categories), drillPool (hardcoded fallback),
// specialties + stationSpecialty (for Coaching Staff auto-assign), and optionally
// pairStations (station keys that default-pair into one parallel/simultaneous group,
// e.g. football's position-group breakout — mirrors how real practices run those
// groups at the same time with different coaches, not one after another).
export const AGE_ORDER = ['6U', '8U', '10U', '12U', '14U', '16U', '18U']

const BASEBALL_CONFIG = {
  stationOrder: ['warmup', 'throwing', 'fielding', 'hitting', 'baserunning', 'conditioning', 'situations'],
  stationLabels: {
    warmup: 'Warm-Up', throwing: 'Throwing', fielding: 'Fielding',
    hitting: 'Hitting', baserunning: 'Baserunning', conditioning: 'Conditioning', situations: 'Team Defense',
  },
  stationIcons: {
    warmup: '🔥', throwing: '💪', fielding: '🧤',
    hitting: '🏏', baserunning: '🏃', conditioning: '⚡', situations: '🎯',
  },
  // Minutes per station for each age+duration combo
  timePlans: {
    '6U':  { 45: { warmup:8,throwing:7,fielding:10,hitting:15,baserunning:5,conditioning:0,situations:0 }, 60: { warmup:10,throwing:10,fielding:12,hitting:18,baserunning:7,conditioning:3,situations:0 } },
    '8U':  { 60: { warmup:8,throwing:10,fielding:15,hitting:18,baserunning:5,conditioning:4,situations:0 }, 75: { warmup:10,throwing:12,fielding:18,hitting:22,baserunning:8,conditioning:5,situations:0 } },
    '10U': { 60: { warmup:7,throwing:10,fielding:15,hitting:18,baserunning:5,conditioning:5,situations:0 }, 75: { warmup:8,throwing:12,fielding:18,hitting:22,baserunning:7,conditioning:5,situations:3 }, 90: { warmup:10,throwing:12,fielding:20,hitting:25,baserunning:8,conditioning:8,situations:7 } },
    '12U': { 75: { warmup:8,throwing:10,fielding:18,hitting:22,baserunning:5,conditioning:5,situations:7 }, 90: { warmup:8,throwing:12,fielding:20,hitting:25,baserunning:8,conditioning:7,situations:10 }, 120: { warmup:10,throwing:15,fielding:25,hitting:30,baserunning:10,conditioning:10,situations:20 } },
    '14U': { 90: { warmup:8,throwing:12,fielding:20,hitting:25,baserunning:7,conditioning:8,situations:10 }, 120: { warmup:10,throwing:15,fielding:25,hitting:30,baserunning:10,conditioning:10,situations:20 }, 150: { warmup:10,throwing:15,fielding:30,hitting:35,baserunning:15,conditioning:15,situations:30 } },
    '16U': { 90: { warmup:8,throwing:12,fielding:20,hitting:25,baserunning:5,conditioning:10,situations:10 }, 120: { warmup:10,throwing:15,fielding:28,hitting:32,baserunning:8,conditioning:12,situations:15 }, 150: { warmup:10,throwing:15,fielding:35,hitting:40,baserunning:10,conditioning:15,situations:25 } },
    '18U': { 90: { warmup:8,throwing:12,fielding:20,hitting:25,baserunning:5,conditioning:10,situations:10 }, 120: { warmup:10,throwing:15,fielding:28,hitting:35,baserunning:8,conditioning:12,situations:12 }, 150: { warmup:10,throwing:15,fielding:35,hitting:42,baserunning:10,conditioning:13,situations:25 } },
  },
  // Recommended drills per station per age group (from practice_mapping research)
  drillPool: {
    warmup: { all: ['Dynamic Warmup Leg Swings','Arm Circle Shoulder Warmup','Cross Body Stretch shoulder','Sleeper Stretch shoulder','90-90 Hip Stretch baseball','Thoracic Spine Rotation Stretch'] },
    throwing: {
      '6U':['Long Toss 60 feet warmup','Rotator Cuff Band External Rotation'],
      '8U':['Long Toss 60 feet warmup','Four Seam Grip Drill','Rotator Cuff Band External Rotation'],
      '10U':['Long Toss 60 feet warmup','Four Seam Grip Drill','Crow Hop Throw Drill','Rotator Cuff Band External Rotation'],
      '12U':['Long Toss 60 feet warmup','Four Seam Grip Drill','Crow Hop Throw Drill','Balance Point Drill pitcher','Arm Circle Shoulder Warmup'],
      '14U':['Long Toss 60 feet warmup','Four Seam Grip Drill','Crow Hop Throw Drill','Balance Point Drill pitcher','Hip Drive Drill pitching','Wrist Snap Drill pitching'],
      '16U':['Long Toss 60 feet warmup','Four Seam Grip Drill','Crow Hop Throw Drill','Balance Point Drill pitcher','Hip Drive Drill pitching','Wrist Snap Drill pitching'],
      '18U':['Long Toss 60 feet warmup','Four Seam Grip Drill','Balance Point Drill pitcher','Hip Drive Drill pitching','Wrist Snap Drill pitching'],
    },
    fielding: {
      '6U':['Ready Position Fielding Stance','Ground Ball Forehand Drill'],
      '8U':['Ready Position Fielding Stance','Ground Ball Forehand Drill','Short Hop Fielding Drill'],
      '10U':['Ready Position Fielding Stance','Ground Ball Forehand Drill','Ground Ball Backhand Drill','Short Hop Fielding Drill','First Step Fielder Reaction Drill'],
      '12U':['Ready Position Fielding Stance','Ground Ball Forehand Drill','Ground Ball Backhand Drill','Short Hop Fielding Drill','Double Play Pivot Drill','First Step Fielder Reaction Drill'],
      '14U':['Ground Ball Forehand Drill','Ground Ball Backhand Drill','Short Hop Fielding Drill','Double Play Pivot Drill','First Step Fielder Reaction Drill','Outfield Drop Step Drill'],
      '16U':['Ground Ball Forehand Drill','Ground Ball Backhand Drill','Double Play Pivot Drill','First Step Fielder Reaction Drill','Outfield Drop Step Drill'],
      '18U':['Ground Ball Backhand Drill','Double Play Pivot Drill','First Step Fielder Reaction Drill','Outfield Drop Step Drill'],
    },
    hitting: {
      '6U':['Batting Cage','Grip and Hand Position','Tee Work','Dry Swings'],
      '8U':['Batting Cage','Grip and Hand Position','Tee Work','Dry Swings','Weight Distribution 50-50'],
      '10U':['Batting Cage','Hip Turn Drill fence','Tee Work','Dry Swings','Contact Point Tee Drill inside','Weight Distribution 50-50'],
      '12U':['Batting Cage','Hip Turn Drill fence','Tee Work','Hip Fire Drill front toss','Contact Point Tee Drill inside','One Hand Top Hand Drill','Bat Angle at Setup'],
      '14U':['Batting Cage','Hip Turn Drill fence','Hip Fire Drill front toss','Contact Point Tee Drill inside','One Hand Top Hand Drill','Bat Angle at Setup','Load and Stride Drill'],
      '16U':['Batting Cage','Hip Fire Drill front toss','Contact Point Tee Drill inside','One Hand Top Hand Drill','Bat Angle at Setup','Load and Stride Drill'],
      '18U':['Batting Cage','Hip Fire Drill front toss','One Hand Top Hand Drill','Bat Angle at Setup','Load and Stride Drill'],
    },
    baserunning: {
      '6U':['Primary Leadoff Stance Drill'],
      '8U':['Primary Leadoff Stance Drill','Rounding First Base Arc Drill'],
      '10U':['Primary Leadoff Stance Drill','Rounding First Base Arc Drill','Secondary Lead Timing Drill'],
      '12U':['Primary Leadoff Stance Drill','Rounding First Base Arc Drill','Secondary Lead Timing Drill','Stealing Second Base Read Drill'],
      '14U':['Rounding First Base Arc Drill','Secondary Lead Timing Drill','Stealing Second Base Read Drill'],
      '16U':['Secondary Lead Timing Drill','Stealing Second Base Read Drill'],
      '18U':['Secondary Lead Timing Drill','Stealing Second Base Read Drill'],
    },
    conditioning: {
      '6U':['Glute Bridge Exercise'],
      '8U':['Glute Bridge Exercise','Lateral Band Walk Hip'],
      '10U':['Glute Bridge Exercise','Lateral Band Walk Hip','Box Jump Explosive Drill'],
      '12U':['Glute Bridge Exercise','Lateral Band Walk Hip','Box Jump Explosive Drill','Rotational Medicine Ball Throw'],
      '14U':['Lateral Band Walk Hip','Box Jump Explosive Drill','Rotational Medicine Ball Throw','Single Leg Deadlift baseball'],
      '16U':['Box Jump Explosive Drill','Rotational Medicine Ball Throw','Single Leg Deadlift baseball'],
      '18U':['Box Jump Explosive Drill','Rotational Medicine Ball Throw','Single Leg Deadlift baseball'],
    },
    situations: { all: ['First and Third Defense Drill','Bunt Coverage Defense Drill','Cut-Off and Relay Drill','Rundown Pickle Drill','Infield Pop-Up Priority Drill'] },
  },
  stationCats: {
    warmup: ['warmup', 'flexibility'], throwing: ['pitching'], fielding: ['fielding', 'catching'],
    hitting: ['hitting'], baserunning: ['baserunning'], conditioning: ['conditioning'], situations: ['fielding'],
  },
  specialties: [
    { id:'general', label:'General (All Around)' }, { id:'hitting', label:'Hitting' }, { id:'pitching', label:'Pitching' },
    { id:'infield', label:'Fielding — Infield' }, { id:'outfield', label:'Fielding — Outfield' },
    { id:'catching', label:'Catching' }, { id:'conditioning', label:'Conditioning' }, { id:'baserunning', label:'Baserunning' },
  ],
  stationSpecialty: {
    warmup:'general', throwing:'pitching', fielding:'infield', hitting:'hitting',
    baserunning:'baserunning', conditioning:'conditioning', situations:'general', catching:'catching',
  },
  pairStations: [],
}

// Football/flag_football — built 2026-08-20 from Ollama research (RESEARCH/football_practice_structure.txt),
// same methodology as baseball's practice_mapping research. Position groups run in PARALLEL (breakout
// periods with separate coaches), not sequentially like baseball's stations — skill/line/defense default-pair
// into one simultaneous block via pairStations, matching how real youth football practices are actually run.
// Full position-coach granularity — a program with a real staff (Phillip's own words: "sometimes
// they have eleven coaches") gets one station per specialty coach (QB/WR-TE/RB/OL/DL/LB-DB all
// separate, each pairable/unpairable via the existing Station Pairing UI). A small team just
// leaves them all paired into one simultaneous block (the default) and assigns one "well-rounded"
// coach to cover several via the existing multi-station Coaching Staff assignment — no separate
// coach-count logic needed, the pairing/assignment tools already built handle both ends.
const FOOTBALL_CONFIG = {
  stationOrder: ['warmup', 'qb_group', 'receiving_group', 'rb_group', 'ol_group', 'dl_group', 'lb_db_group', 'special_teams', 'team_period', 'conditioning'],
  stationLabels: {
    warmup: 'Warm-Up', qb_group: 'QB', receiving_group: 'WR/TE (Receiving)', rb_group: 'RB (Rushing)',
    ol_group: 'O-Line', dl_group: 'D-Line', lb_db_group: 'LB/DB (Coverage)',
    special_teams: 'Special Teams', team_period: 'Team Period (Situational)', conditioning: 'Conditioning',
  },
  stationIcons: {
    warmup: '🔥', qb_group: '🎯', receiving_group: '🙌', rb_group: '🏃',
    ol_group: '🛡️', dl_group: '💥', lb_db_group: '🏈',
    special_teams: '⚡', team_period: '👥', conditioning: '💨',
  },
  // Minutes per station for each age+duration combo — individual/position-group time is the same
  // share for all 6 paired groups below (each specialty coach gets the full individual-period time).
  timePlans: {
    '8U':  { 60: { warmup:5,qb_group:15,receiving_group:15,rb_group:15,ol_group:15,dl_group:15,lb_db_group:15,special_teams:5,team_period:25,conditioning:10 }, 90: { warmup:10,qb_group:25,receiving_group:25,rb_group:25,ol_group:25,dl_group:25,lb_db_group:25,special_teams:10,team_period:35,conditioning:10 }, 120: { warmup:10,qb_group:35,receiving_group:35,rb_group:35,ol_group:35,dl_group:35,lb_db_group:35,special_teams:15,team_period:45,conditioning:15 } },
    '10U': { 60: { warmup:5,qb_group:20,receiving_group:20,rb_group:20,ol_group:20,dl_group:20,lb_db_group:20,special_teams:5,team_period:20,conditioning:10 }, 90: { warmup:10,qb_group:30,receiving_group:30,rb_group:30,ol_group:30,dl_group:30,lb_db_group:30,special_teams:10,team_period:30,conditioning:10 }, 120: { warmup:10,qb_group:40,receiving_group:40,rb_group:40,ol_group:40,dl_group:40,lb_db_group:40,special_teams:15,team_period:40,conditioning:15 } },
    '12U': { 60: { warmup:5,qb_group:15,receiving_group:15,rb_group:15,ol_group:15,dl_group:15,lb_db_group:15,special_teams:5,team_period:30,conditioning:5 }, 90: { warmup:10,qb_group:25,receiving_group:25,rb_group:25,ol_group:25,dl_group:25,lb_db_group:25,special_teams:10,team_period:40,conditioning:5 }, 120: { warmup:10,qb_group:30,receiving_group:30,rb_group:30,ol_group:30,dl_group:30,lb_db_group:30,special_teams:15,team_period:55,conditioning:10 } },
    '14U': { 60: { warmup:5,qb_group:10,receiving_group:10,rb_group:10,ol_group:10,dl_group:10,lb_db_group:10,special_teams:5,team_period:35,conditioning:5 }, 90: { warmup:10,qb_group:20,receiving_group:20,rb_group:20,ol_group:20,dl_group:20,lb_db_group:20,special_teams:10,team_period:45,conditioning:5 }, 120: { warmup:10,qb_group:25,receiving_group:25,rb_group:25,ol_group:25,dl_group:25,lb_db_group:25,special_teams:15,team_period:60,conditioning:10 } },
  },
  drillPool: {
    warmup: { all: ['Warm-up Circuits', 'Dynamic Stretching', 'Pre-Practice Drills'] },
    qb_group: { all: ['Throwing Accuracy', 'Deep Ball Drill', 'Target Practice'] },
    receiving_group: { all: ['Route Running', 'Deep Route Drill', 'Crossing Routes', 'Cone Weaving'] },
    rb_group: { all: ['Vision Drill', 'Ball Security Drill', 'Cut Drill'] },
    ol_group: { all: ['Blocking Stance', 'Power Block Drill', 'Blocking Movement'] },
    dl_group: { all: ['Block Shed Drill', 'Bull Rush Drill', 'Get Off Drill', 'Pass Rush Drill'] },
    lb_db_group: { all: ['Press Coverage Drill', 'Drop Coverage Drill', 'Ball Tracking Drill'] },
    special_teams: { all: ['Kickoff Coverage Drill', 'Punt Return Practice', 'Field Goal Drill'] },
    team_period: { all: [] }, // situational/7-on-7 — coach-run, not itemized drills
    conditioning: { all: ['Sprint Drill', 'Interval Running', 'HIIT Training'] },
  },
  // Map station keys -> real bc_drills categories. 'dline' split out from 'defense'/'defensive'
  // 2026-08-20 so D-Line finally has real distinct content instead of sharing LB/DB's pool.
  stationCats: {
    warmup: ['warmup', 'flexibility'],
    qb_group: ['quarterback', 'passing'],
    receiving_group: ['receiving'],
    rb_group: ['rushing'],
    ol_group: ['blocking'],
    dl_group: ['dline'],
    lb_db_group: ['defense', 'defensive'],
    special_teams: ['special_teams'],
    team_period: [], // no drill-level content for this — real gap, coach runs scrimmage/situational work directly
    conditioning: ['conditioning'],
  },
  specialties: [
    { id:'general', label:'General (All Around)' }, { id:'qb_group', label:'QB Coach' },
    { id:'receiving_group', label:'WR/TE Coach' }, { id:'rb_group', label:'RB Coach' },
    { id:'ol_group', label:'O-Line Coach' }, { id:'dl_group', label:'D-Line Coach' },
    { id:'lb_db_group', label:'LB/DB Coach' }, { id:'special_teams', label:'Special Teams' },
    { id:'conditioning', label:'Conditioning' },
  ],
  stationSpecialty: {
    warmup:'general', qb_group:'qb_group', receiving_group:'receiving_group', rb_group:'rb_group',
    ol_group:'ol_group', dl_group:'dl_group', lb_db_group:'lb_db_group',
    special_teams:'special_teams', team_period:'general', conditioning:'conditioning',
  },
  // All 6 position groups default-pair into one simultaneous block (small-team default — one
  // coach or a few "well-rounded" coaches cover them via multi-station assignment). A staff with
  // a real specialty coach per position un-pairs whichever groups they can now run separately,
  // using the Station Pairing UI already built — no coach-count branching logic needed.
  pairStations: ['qb_group', 'receiving_group', 'rb_group', 'ol_group', 'dl_group', 'lb_db_group'],
}

// Basketball — built 2026-08-22, real bc_drills content (57 drills, 8 categories, 6U-18U) already
// existed, this just gives it a real station structure instead of falling back to baseball's.
// Sequential stations like baseball (no parallel position groups — a basketball practice doesn't
// break out into simultaneous specialty groups the way football's O-Line/D-Line/etc. do).
// timePlans for 8U/10U/12U/14U (60/90/120) are the real, verified USA-Basketball-grounded numbers
// from a live Ollama research pass (RESEARCH/basketball_practice_structure.txt, all 12 age x
// duration tables confirmed summing exactly to their stated duration — one row (14U/120) needed
// a regenerate after an earlier draft summed to 125, noted inline in that file). That research's
// real station list is Warmup/Dribbling/Passing/Shooting/Defense/Rebounding/Scrimmage/Water
// Breaks — no separate "Conditioning" block — so 'conditioning' was replaced with 'scrimmage'
// (real, itemless like football's team_period — coaches run 3v3/4v4/5v5, not a drill list) and
// 'water_break' (also itemless, same real-timed-block-with-no-drills pattern as team_period).
// 6U/16U/18U aren't covered by the research (it only asked about 8U-14U) — those three are hand-
// extrapolated from the real 14U ratios, not independently research-verified.
const BASKETBALL_CONFIG = {
  stationOrder: ['warmup', 'dribbling', 'passing', 'shooting', 'defense', 'rebounding', 'scrimmage', 'water_break'],
  stationLabels: {
    warmup: 'Warm-Up', dribbling: 'Ball Handling', passing: 'Passing', shooting: 'Shooting',
    defense: 'Defense', rebounding: 'Rebounding', scrimmage: 'Scrimmage / Live Play', water_break: 'Water Break',
  },
  stationIcons: {
    warmup: '🔥', dribbling: '🏀', passing: '🤝', shooting: '🎯',
    defense: '🛡️', rebounding: '💪', scrimmage: '🆚', water_break: '💧',
  },
  timePlans: {
    '6U':  { 45: { warmup:5,dribbling:12,passing:6,shooting:10,defense:2,rebounding:0,scrimmage:8,water_break:2 }, 60: { warmup:6,dribbling:15,passing:8,shooting:13,defense:3,rebounding:0,scrimmage:12,water_break:3 } },
    '8U':  { 60: { warmup:5,dribbling:10,passing:8,shooting:10,defense:5,rebounding:7,scrimmage:10,water_break:5 }, 90: { warmup:10,dribbling:15,passing:10,shooting:15,defense:10,rebounding:10,scrimmage:15,water_break:5 }, 120: { warmup:10,dribbling:20,passing:15,shooting:20,defense:10,rebounding:10,scrimmage:30,water_break:5 } },
    '10U': { 60: { warmup:5,dribbling:10,passing:8,shooting:10,defense:8,rebounding:7,scrimmage:8,water_break:4 }, 90: { warmup:10,dribbling:15,passing:12,shooting:15,defense:12,rebounding:10,scrimmage:13,water_break:3 }, 120: { warmup:10,dribbling:20,passing:15,shooting:20,defense:15,rebounding:10,scrimmage:25,water_break:5 } },
    '12U': { 60: { warmup:5,dribbling:8,passing:7,shooting:10,defense:10,rebounding:5,scrimmage:10,water_break:5 }, 90: { warmup:8,dribbling:12,passing:10,shooting:15,defense:15,rebounding:8,scrimmage:14,water_break:8 }, 120: { warmup:10,dribbling:15,passing:15,shooting:20,defense:20,rebounding:10,scrimmage:25,water_break:5 } },
    '14U': { 60: { warmup:5,dribbling:7,passing:6,shooting:10,defense:12,rebounding:5,scrimmage:10,water_break:5 }, 90: { warmup:7,dribbling:10,passing:8,shooting:15,defense:18,rebounding:7,scrimmage:15,water_break:10 }, 120: { warmup:15,dribbling:15,passing:10,shooting:20,defense:15,rebounding:10,scrimmage:30,water_break:5 } },
    '16U': { 90: { warmup:6,dribbling:8,passing:7,shooting:13,defense:20,rebounding:7,scrimmage:22,water_break:7 }, 120: { warmup:8,dribbling:10,passing:9,shooting:17,defense:27,rebounding:9,scrimmage:32,water_break:8 }, 150: { warmup:10,dribbling:12,passing:11,shooting:21,defense:34,rebounding:11,scrimmage:41,water_break:10 } },
    '18U': { 90: { warmup:5,dribbling:6,passing:6,shooting:12,defense:22,rebounding:8,scrimmage:24,water_break:7 }, 120: { warmup:7,dribbling:8,passing:8,shooting:16,defense:29,rebounding:10,scrimmage:34,water_break:8 }, 150: { warmup:9,dribbling:10,passing:10,shooting:20,defense:37,rebounding:12,scrimmage:42,water_break:10 } },
  },
  drillPool: {
    warmup: { all: ['Ball Toss', 'Ball Toss and Catch', 'Dynamic Stretching', 'Full Body Stretching'] },
    dribbling: { all: ['Bouncing Ball', 'Dribbling Through Cones', 'Cone Weaving', 'Cone Weaving Dribbling', 'Advanced Dribbling Moves', 'Two-Ball Dribbling'] },
    passing: { all: ['Two-Handed Passing', 'Passing Through Cones', 'Passing Accuracy', 'Passing Through Targets'] },
    shooting: { all: ['Stationary Shooting', 'Two-Handed Shooting', 'Advanced Shooting Form', 'Free Throw Shooting', 'Elite Shooting Form'] },
    defense: { all: ['Defensive Stance', 'Defensive Slide', 'Defensive Slides', 'Defensive Slides Advanced'] },
    rebounding: { all: ['Rebounding Drill', 'Rebounding Box-Out', 'Rebounding Sprint', 'Rebounding Sprint Advanced'] },
    scrimmage: { all: [] },
    water_break: { all: [] },
  },
  stationCats: {
    warmup: ['warmup', 'flexibility'], dribbling: ['dribbling'], passing: ['passing'],
    shooting: ['shooting'], defense: ['defense'], rebounding: ['rebounding'],
    scrimmage: [], // no bc_drills category — coach-run 3v3/4v4/5v5, same real gap as football's team_period
    water_break: [], // real timed block, no drill content, same pattern
  },
  specialties: [
    { id:'general', label:'General (All Around)' }, { id:'dribbling', label:'Ball Handling' }, { id:'passing', label:'Passing' },
    { id:'shooting', label:'Shooting' }, { id:'defense', label:'Defense' }, { id:'rebounding', label:'Rebounding' },
  ],
  stationSpecialty: {
    warmup:'general', dribbling:'dribbling', passing:'passing', shooting:'shooting',
    defense:'defense', rebounding:'rebounding', scrimmage:'general', water_break:'general',
  },
  pairStations: [],
}

// Soccer — built 2026-08-22, real bc_drills content already existed (56 drills, 7 categories,
// 6U-18U) — no 'warmup' category exists in the data, so the warmup station maps to 'flexibility'
// instead (Basic/Dynamic Stretching etc. cover that role, same as basketball's warmup station).
// timePlans for 8U/10U/12U/14U (60/90/120) are the real, verified US-Soccer-grounded numbers from
// a live Ollama research pass (RESEARCH/soccer_practice_structure.txt, research_soccer_practice_
// structure.py) — all 12 age x duration tables independently re-verified summing exactly to their
// stated duration (one cosmetic issue found and left as-is: the model's own bonus arithmetic
// recap got truncated mid-line at the end of the 60-min section, doesn't affect any real data).
// That research's real station list is Warmup/Dribbling/Passing/Shooting/Defending/Small-Sided-
// Games(Scrimmage)/Water Breaks — no separate "Goalkeeping" or "Conditioning" block — so, same
// fix applied to basketball, 'goalkeeping' and 'conditioning' were replaced with 'scrimmage' and
// 'water_break' (both itemless, coach-run, same real-timed-block-with-no-drills pattern as
// football's team_period). 6U isn't in the tabulated data but IS described narratively in the
// research (U6: 5 warmup / 10 ball mastery / 40 SSG / 5 cooldown for a 60-min session) — used
// directly, with the 45-min variant scaled down from it. 16U/18U aren't covered at all and are
// hand-extrapolated from 14U's real ratios, not independently research-verified.
const SOCCER_CONFIG = {
  stationOrder: ['warmup', 'dribbling', 'passing', 'shooting', 'defending', 'scrimmage', 'water_break'],
  stationLabels: {
    warmup: 'Warm-Up', dribbling: 'Dribbling', passing: 'Passing', shooting: 'Shooting',
    defending: 'Defending', scrimmage: 'Small-Sided Games', water_break: 'Water Break',
  },
  stationIcons: {
    warmup: '🔥', dribbling: '⚽', passing: '🤝', shooting: '🥅',
    defending: '🛡️', scrimmage: '🆚', water_break: '💧',
  },
  timePlans: {
    '6U':  { 45: { warmup:4,dribbling:7,passing:0,shooting:0,defending:0,scrimmage:30,water_break:4 }, 60: { warmup:5,dribbling:10,passing:0,shooting:0,defending:0,scrimmage:40,water_break:5 } },
    '8U':  { 60: { warmup:5,dribbling:10,passing:8,shooting:7,defending:0,scrimmage:25,water_break:5 }, 90: { warmup:10,dribbling:20,passing:15,shooting:10,defending:5,scrimmage:20,water_break:10 }, 120: { warmup:10,dribbling:25,passing:15,shooting:15,defending:10,scrimmage:35,water_break:10 } },
    '10U': { 60: { warmup:6,dribbling:9,passing:8,shooting:7,defending:5,scrimmage:20,water_break:5 }, 90: { warmup:10,dribbling:15,passing:20,shooting:10,defending:5,scrimmage:20,water_break:10 }, 120: { warmup:12,dribbling:20,passing:20,shooting:15,defending:13,scrimmage:25,water_break:15 } },
    '12U': { 60: { warmup:5,dribbling:8,passing:10,shooting:7,defending:8,scrimmage:17,water_break:5 }, 90: { warmup:10,dribbling:10,passing:20,shooting:15,defending:10,scrimmage:15,water_break:10 }, 120: { warmup:15,dribbling:15,passing:20,shooting:15,defending:20,scrimmage:25,water_break:10 } },
    '14U': { 60: { warmup:5,dribbling:7,passing:10,shooting:8,defending:10,scrimmage:15,water_break:5 }, 90: { warmup:10,dribbling:5,passing:15,shooting:15,defending:15,scrimmage:20,water_break:10 }, 120: { warmup:15,dribbling:10,passing:20,shooting:15,defending:25,scrimmage:25,water_break:10 } },
    '16U': { 90: { warmup:8,dribbling:4,passing:12,shooting:14,defending:20,scrimmage:22,water_break:10 }, 120: { warmup:12,dribbling:8,passing:16,shooting:16,defending:30,scrimmage:28,water_break:10 }, 150: { warmup:15,dribbling:10,passing:20,shooting:20,defending:38,scrimmage:35,water_break:12 } },
    '18U': { 90: { warmup:7,dribbling:3,passing:10,shooting:13,defending:24,scrimmage:23,water_break:10 }, 120: { warmup:10,dribbling:6,passing:14,shooting:16,defending:34,scrimmage:30,water_break:10 }, 150: { warmup:12,dribbling:8,passing:17,shooting:19,defending:42,scrimmage:40,water_break:12 } },
  },
  drillPool: {
    warmup: { all: ['Basic Stretching', 'Simple Stretching', 'Dynamic Stretching', 'Dynamic Flexibility', 'Full Body Flexibility'] },
    dribbling: { all: ['Simple Dribbling', 'Ball Toss', 'Cone Weaving', 'Advanced Dribbling'] },
    passing: { all: ['Basic Passing', 'Toss and Catch', 'Wall Passes', 'Passing Accuracy', 'Passing Under Pressure', 'Advanced Passing'] },
    shooting: { all: ['Basic Shooting', 'Simple Shooting', 'Shooting Practice', 'Shooting Accuracy', 'Shooting Under Pressure'] },
    defending: { all: ['Basic Defending', 'Defensive Positioning', 'Defensive Sliding'] },
    scrimmage: { all: [] },
    water_break: { all: [] },
  },
  stationCats: {
    warmup: ['flexibility'], dribbling: ['dribbling'], passing: ['passing'],
    shooting: ['shooting'], defending: ['defending'],
    scrimmage: [], // no bc_drills category — coach-run small-sided games, same real gap as football's team_period
    water_break: [], // real timed block, no drill content, same pattern
  },
  specialties: [
    { id:'general', label:'General (All Around)' }, { id:'dribbling', label:'Dribbling' }, { id:'passing', label:'Passing' },
    { id:'shooting', label:'Shooting' }, { id:'defending', label:'Defense' },
  ],
  stationSpecialty: {
    warmup:'general', dribbling:'dribbling', passing:'passing', shooting:'shooting',
    defending:'defending', scrimmage:'general', water_break:'general',
  },
  pairStations: [],
}

// Flag Football — built 2026-08-22, real research-verified from the start (research_flag_football_
// practice_structure.py -> RESEARCH/flag_football_practice_structure.txt, USA Football certified-
// coach prompts grounded in the actual 41-drill library: defense 7, flag_pulling 16, passing 7,
// receiving 6, rushing 5). All 12 age x duration tables independently re-verified summing exactly
// to duration (12U/120 needed a regenerate after an earlier draft summed to 130, noted inline in
// the research file, same pattern as basketball's and soccer's math-error catches).
// The research's tabulated time-plan blocks (Warmup/Skill-QB/Rushers/Flag-Pulling/Defense/Team-
// Scrimmage/Water-Breaks) map cleanly 1:1 onto all 5 real bc_drills categories with ZERO orphaned
// content, unlike basketball/soccer's fixes: skill_qb = passing+receiving (QB throws, WR catches,
// practiced together), rushers = rushing, flag_pulling = flag_pulling, defense = defense.
// The research's OWN prose (see REALISTIC GROUPING section) argues these 4 specialty groups should
// collapse into a simpler 2-group Offense/Defense split for 1-2 coach staffs, rather than running
// 4 separate stations. That's exactly what pairStations already solves elsewhere in this file —
// same mechanic tackle football's FOOTBALL_CONFIG uses (full position-group granularity for a real
// staff, all paired into one simultaneous block by default for a small one, unpairable via the
// existing Station Pairing UI). No new mechanism needed, so all 4 specialty stations are kept and
// default-paired.
// GAP: every bc_drills flag_football row caps at age_max=12U (confirmed via live query) — there is
// NO real drill content for 14U-18U teams. The research still models 14U structurally (and this
// config still provides 14U/16U/18U time plans for the engine), but a 14U+ flag team will silently
// fall back to the hardcoded drillPool below, not real DB drills, until flag-specific teen content
// is sourced. Flagged, not fixed — same class of gap as basketball/soccer's orphaned categories.
const FLAG_FOOTBALL_CONFIG = {
  stationOrder: ['warmup', 'skill_qb', 'rushers', 'flag_pulling', 'defense', 'scrimmage', 'water_break'],
  stationLabels: {
    warmup: 'Warm-Up', skill_qb: 'Skill / QB (Pass & Catch)', rushers: 'Rushers',
    flag_pulling: 'Flag-Pulling', defense: 'Defense', scrimmage: 'Team / Scrimmage', water_break: 'Water Break',
  },
  stationIcons: {
    warmup: '🔥', skill_qb: '🎯', rushers: '🏃',
    flag_pulling: '🚩', defense: '🛡️', scrimmage: '🆚', water_break: '💧',
  },
  timePlans: {
    '6U':  { 45: { warmup:5,skill_qb:8,rushers:3,flag_pulling:10,defense:2,scrimmage:13,water_break:4 }, 60: { warmup:5,skill_qb:10,rushers:4,flag_pulling:14,defense:3,scrimmage:18,water_break:6 } },
    '8U':  { 60: { warmup:5,skill_qb:10,rushers:5,flag_pulling:10,defense:5,scrimmage:15,water_break:10 }, 90: { warmup:10,skill_qb:15,rushers:5,flag_pulling:20,defense:10,scrimmage:25,water_break:5 }, 120: { warmup:15,skill_qb:20,rushers:10,flag_pulling:25,defense:15,scrimmage:30,water_break:5 } },
    '10U': { 60: { warmup:5,skill_qb:12,rushers:8,flag_pulling:10,defense:8,scrimmage:12,water_break:5 }, 90: { warmup:10,skill_qb:15,rushers:10,flag_pulling:15,defense:15,scrimmage:20,water_break:5 }, 120: { warmup:12,skill_qb:25,rushers:15,flag_pulling:20,defense:23,scrimmage:20,water_break:5 } },
    '12U': { 60: { warmup:5,skill_qb:10,rushers:8,flag_pulling:10,defense:10,scrimmage:12,water_break:5 }, 90: { warmup:10,skill_qb:15,rushers:10,flag_pulling:10,defense:20,scrimmage:20,water_break:5 }, 120: { warmup:15,skill_qb:20,rushers:15,flag_pulling:15,defense:20,scrimmage:30,water_break:5 } },
    '14U': { 60: { warmup:5,skill_qb:10,rushers:8,flag_pulling:10,defense:10,scrimmage:12,water_break:5 }, 90: { warmup:10,skill_qb:15,rushers:10,flag_pulling:10,defense:20,scrimmage:20,water_break:5 }, 120: { warmup:8,skill_qb:20,rushers:12,flag_pulling:10,defense:25,scrimmage:40,water_break:5 } },
    '16U': { 90: { warmup:6,skill_qb:15,rushers:9,flag_pulling:7,defense:19,scrimmage:30,water_break:4 }, 120: { warmup:8,skill_qb:20,rushers:12,flag_pulling:10,defense:25,scrimmage:40,water_break:5 }, 150: { warmup:10,skill_qb:25,rushers:15,flag_pulling:12,defense:31,scrimmage:50,water_break:7 } },
    '18U': { 90: { warmup:5,skill_qb:13,rushers:8,flag_pulling:6,defense:22,scrimmage:32,water_break:4 }, 120: { warmup:7,skill_qb:17,rushers:10,flag_pulling:8,defense:29,scrimmage:44,water_break:5 }, 150: { warmup:8,skill_qb:21,rushers:13,flag_pulling:10,defense:36,scrimmage:55,water_break:7 } },
  },
  drillPool: {
    warmup: { all: [] },
    skill_qb: { all: ['Passing Accuracy Drill', 'Passing Accuracy with Movement', 'Formation Movement Drill', 'Receiving Technique Drill', 'Receiving with Movement', 'Route Running Drill'] },
    rushers: { all: ['Running Route Drill', 'Running with Flag Protection', 'Running Route Under Pressure', '7v7 Team Movement'] },
    flag_pulling: { all: ['Flag Pulling Fundamentals', 'Flag Pulling Accuracy Drill', 'Flag Evasion Movement', 'Flag Protection Drill', 'Flag Pulling Speed Drill', 'No-Run Zone Awareness'] },
    defense: { all: ['Defensive Coverage Drill', 'Defensive Rush Drill', 'Zone Defense Drill', 'Defensive Rush Lane Drill'] },
    scrimmage: { all: [] },
    water_break: { all: [] },
  },
  stationCats: {
    warmup: [], // no real bc_drills category — itemless, same real gap pattern as team_period/water_break
    skill_qb: ['passing', 'receiving'], rushers: ['rushing'], flag_pulling: ['flag_pulling'], defense: ['defense'],
    scrimmage: [], water_break: [],
  },
  specialties: [
    { id:'general', label:'General (All Around)' }, { id:'skill_qb', label:'Skill/QB Coach' },
    { id:'rushers', label:'Rushers Coach' }, { id:'flag_pulling', label:'Flag-Pulling Coach' }, { id:'defense', label:'Defense Coach' },
  ],
  stationSpecialty: {
    warmup:'general', skill_qb:'skill_qb', rushers:'rushers', flag_pulling:'flag_pulling',
    defense:'defense', scrimmage:'general', water_break:'general',
  },
  // Default-paired into one simultaneous block for 1-2 coach staffs (research's explicit
  // recommendation), same mechanic as tackle football — unpair via Station Pairing UI for a
  // staff big enough to run Skill/QB, Rushers, Flag-Pulling, and Defense as separate groups.
  pairStations: ['skill_qb', 'rushers', 'flag_pulling', 'defense'],
}

// Softball — built 2026-08-22, real research-verified from the start (research_softball_practice_
// structure.py -> RESEARCH/softball_practice_structure.txt, USA Softball certified-coach prompts).
// All 12 age x duration tables independently re-verified summing exactly to duration (14U/120 needed
// a regenerate after an earlier draft summed to 115, same math-error pattern as basketball/soccer/
// flag football, caught and fixed the same verified way).
// Softball's own bc_drills library is warmup(18)+catching(37) only, 6U-8U — a real content gap.
// Softball is NOT baseball with a different ball: pitching is a completely different motion
// (underhand windmill vs baseball's overhand), so baseball's pitching drills are never pulled in —
// 'pitching_catching' stays a real, itemless gap (stationCats: []) until softball-specific pitching
// content is sourced. Hitting/fielding/baserunning mechanics ARE close enough to share, so
// loadDrillsFromDB's softball branch (in the web app) pulls those three baseball categories in
// alongside softball's own content (verified live against the real DB before wiring: 37 softball
// catching + 18 softball warmup + 31 baseball hitting + 18 baseball fielding + 8 baseball
// baserunning = 112 rows, zero baseball pitching rows). 'throwing_catch' maps only to softball's
// OWN 'catching' category (partner catch-play drills) — baseball also has a 'catching' category
// (catcher-specific technique) but it's deliberately excluded from the softball query, so no
// cross-sport mixing there.
// Sequential stations like baseball (no parallel position groups — matches the research's simple
// 2-3 station rotation model, not football's simultaneous position-group breakouts).
const SOFTBALL_CONFIG = {
  stationOrder: ['warmup', 'hitting', 'fielding', 'throwing_catch', 'pitching_catching', 'baserunning', 'scrimmage', 'water_break'],
  stationLabels: {
    warmup: 'Warm-Up', hitting: 'Hitting/Batting', fielding: 'Fielding', throwing_catch: 'Throwing / Catch Play',
    pitching_catching: 'Pitching / Catching', baserunning: 'Baserunning', scrimmage: 'Scrimmage / Live Play', water_break: 'Water Break',
  },
  stationIcons: {
    warmup: '🔥', hitting: '🥎', fielding: '🧤', throwing_catch: '🤾',
    pitching_catching: '🌀', baserunning: '🏃', scrimmage: '🆚', water_break: '💧',
  },
  timePlans: {
    '6U':  { 45: { warmup:4,hitting:10,fielding:10,throwing_catch:5,pitching_catching:0,baserunning:3,scrimmage:9,water_break:4 }, 60: { warmup:5,hitting:13,fielding:13,throwing_catch:7,pitching_catching:0,baserunning:4,scrimmage:13,water_break:5 } },
    '8U':  { 60: { warmup:5,hitting:10,fielding:10,throwing_catch:10,pitching_catching:0,baserunning:5,scrimmage:15,water_break:5 }, 90: { warmup:10,hitting:20,fielding:15,throwing_catch:10,pitching_catching:5,baserunning:10,scrimmage:15,water_break:5 }, 120: { warmup:10,hitting:25,fielding:20,throwing_catch:15,pitching_catching:5,baserunning:10,scrimmage:25,water_break:10 } },
    '10U': { 60: { warmup:5,hitting:10,fielding:12,throwing_catch:8,pitching_catching:5,baserunning:5,scrimmage:10,water_break:5 }, 90: { warmup:10,hitting:15,fielding:15,throwing_catch:10,pitching_catching:10,baserunning:10,scrimmage:15,water_break:5 }, 120: { warmup:10,hitting:20,fielding:25,throwing_catch:15,pitching_catching:10,baserunning:10,scrimmage:25,water_break:5 } },
    '12U': { 60: { warmup:5,hitting:10,fielding:10,throwing_catch:5,pitching_catching:10,baserunning:5,scrimmage:10,water_break:5 }, 90: { warmup:10,hitting:15,fielding:15,throwing_catch:10,pitching_catching:15,baserunning:10,scrimmage:10,water_break:5 }, 120: { warmup:10,hitting:20,fielding:20,throwing_catch:15,pitching_catching:20,baserunning:10,scrimmage:20,water_break:5 } },
    '14U': { 60: { warmup:5,hitting:8,fielding:8,throwing_catch:5,pitching_catching:12,baserunning:5,scrimmage:12,water_break:5 }, 90: { warmup:10,hitting:15,fielding:15,throwing_catch:10,pitching_catching:20,baserunning:10,scrimmage:5,water_break:5 }, 120: { warmup:15,hitting:20,fielding:15,throwing_catch:10,pitching_catching:15,baserunning:10,scrimmage:30,water_break:5 } },
    '16U': { 90: { warmup:8,hitting:12,fielding:11,throwing_catch:8,pitching_catching:14,baserunning:8,scrimmage:24,water_break:5 }, 120: { warmup:10,hitting:16,fielding:14,throwing_catch:10,pitching_catching:18,baserunning:10,scrimmage:37,water_break:5 }, 150: { warmup:12,hitting:20,fielding:18,throwing_catch:12,pitching_catching:22,baserunning:12,scrimmage:47,water_break:7 } },
    '18U': { 90: { warmup:7,hitting:10,fielding:10,throwing_catch:7,pitching_catching:16,baserunning:7,scrimmage:28,water_break:5 }, 120: { warmup:9,hitting:14,fielding:13,throwing_catch:9,pitching_catching:20,baserunning:9,scrimmage:41,water_break:5 }, 150: { warmup:11,hitting:17,fielding:16,throwing_catch:11,pitching_catching:25,baserunning:11,scrimmage:52,water_break:7 } },
  },
  drillPool: {
    warmup: { all: ['Ball Toss', 'Bunny Hops', 'Cone Weaving', 'Knee Bounces', 'Tummy Touches', 'Walking Hops'] },
    hitting: { all: ['Batting Cage', 'Tee Work', 'Dry Swings', 'Hip Turn Drill fence', 'Contact Point Tee Drill inside'] },
    fielding: { all: ['Ready Position Fielding Stance', 'Ground Ball Forehand Drill', 'Ground Ball Backhand Drill', 'Short Hop Fielding Drill'] },
    throwing_catch: { all: ['Toss and Catch', 'Ball Drop Catch', 'Bounce Catch', 'Walking Catch', 'Jump and Catch'] },
    pitching_catching: { all: [] },
    baserunning: { all: ['Primary Leadoff Stance Drill', 'Rounding First Base Arc Drill', 'Secondary Lead Timing Drill', 'Stealing Second Base Read Drill'] },
    scrimmage: { all: [] },
    water_break: { all: [] },
  },
  stationCats: {
    warmup: ['warmup'], hitting: ['hitting'], fielding: ['fielding'], throwing_catch: ['catching'],
    pitching_catching: [], // real gap — no softball-specific pitching content exists yet, baseball's overhand pitching deliberately not shared
    baserunning: ['baserunning'], scrimmage: [], water_break: [],
  },
  specialties: [
    { id:'general', label:'General (All Around)' }, { id:'hitting', label:'Hitting' }, { id:'fielding', label:'Fielding' },
    { id:'throwing_catch', label:'Catch Play' }, { id:'pitching_catching', label:'Pitching/Catching' }, { id:'baserunning', label:'Baserunning' },
  ],
  stationSpecialty: {
    warmup:'general', hitting:'hitting', fielding:'fielding', throwing_catch:'throwing_catch',
    pitching_catching:'pitching_catching', baserunning:'baserunning', scrimmage:'general', water_break:'general',
  },
  pairStations: [],
}

// One config per sport — every real sport now has its own config. No unhandled sport should ever
// reach getSportConfig's BASEBALL_CONFIG default below; that fallback is only for genuinely unknown
// sport values, not a stand-in for "haven't built this one yet."
export const SPORT_CONFIGS = {
  baseball: BASEBALL_CONFIG,
  softball: SOFTBALL_CONFIG,
  football: FOOTBALL_CONFIG,
  flag_football: FLAG_FOOTBALL_CONFIG,
  basketball: BASKETBALL_CONFIG,
  soccer: SOCCER_CONFIG,
}
export function getSportConfig(sport) { return SPORT_CONFIGS[sport] || BASEBALL_CONFIG }

export function getDrillsForStation(cfg, station, ageGroup, dbDrills = {}) {
  const cats   = cfg.stationCats[station] || []
  const ageIdx = AGE_ORDER.indexOf(ageGroup)
  const fromDB = cats
    .flatMap(cat => dbDrills[cat] || [])
    .filter(d => {
      const minI = AGE_ORDER.indexOf(d.age_min || '6U')
      const maxI = AGE_ORDER.indexOf(d.age_max || '18U')
      return ageIdx >= minI && ageIdx <= maxI
    })
    .map(d => d.name)
  if (fromDB.length > 0) return fromDB
  // Fallback to hardcoded pool while DB loads
  const pool = cfg.drillPool[station]
  return pool?.[ageGroup] || pool?.['all'] || []
}

export function buildPlan(cfg, ageGroup, duration, dbDrills = {}) {
  const times = getTimesForDuration(cfg, ageGroup, duration)
  const pairGroupId = cfg.pairStations.length ? `pair_${cfg.pairStations.join('_')}` : null
  return cfg.stationOrder
    .filter(s => (times[s] || 0) > 0)
    .map(s => {
      const pool = getDrillsForStation(cfg, s, ageGroup, dbDrills)
      return {
        station:    s,
        label:      cfg.stationLabels[s],
        icon:       cfg.stationIcons[s],
        total_mins: times[s],
        drills:     pool.slice(0, 3).map(name => ({ name, mins: Math.round(times[s] / Math.min(3, pool.length || 1)) })),
        pairGroup:  cfg.pairStations.includes(s) ? pairGroupId : undefined,
      }
    })
}

// Default starting duration per age group (shared across sports — reasonable default regardless of sport)
export const DEFAULT_DURATION = { '6U':60, '8U':60, '10U':75, '12U':90, '14U':90, '16U':90, '18U':90 }
export const MIN_DURATION = 30, MAX_DURATION = 240, STEP = 15

// Scale nearest base plan proportionally to any duration
export function getTimesForDuration(cfg, ageGroup, duration) {
  const plans   = cfg.timePlans[ageGroup] || cfg.timePlans['10U'] || Object.values(cfg.timePlans)[0]
  const keys    = Object.keys(plans).map(Number).sort((a,b)=>a-b)
  const closest = keys.reduce((p,c) => Math.abs(c-duration) < Math.abs(p-duration) ? c : p)
  const base    = plans[closest]
  const baseSum = Object.values(base).reduce((a,b)=>a+b,0)
  if (!baseSum) return base
  const scale   = duration / baseSum
  const stations= Object.keys(base)
  let assigned  = 0
  const out     = {}
  stations.forEach((k,i) => {
    if (i === stations.length-1) {
      out[k] = Math.max(0, duration - assigned)
    } else {
      out[k] = Math.max(0, Math.round(base[k] * scale))
      assigned += out[k]
    }
  })
  return out
}
