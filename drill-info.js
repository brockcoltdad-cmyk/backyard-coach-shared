// Extracted from backyard-coach/src/components/DrillInfoModal.jsx (2026-09-05) so the
// native app's drill info popup shows the exact same description/coach cue as web, one
// tested copy instead of two that can drift apart.
export const DRILL_INFO = {
  // WARMUP
  'Dynamic Warmup Leg Swings':      { desc:'Stand next to a fence for balance. Swing one leg forward and back in a controlled arc, loosening the hip flexors and hamstrings.', cue:"Stay tall, swing through full range" },
  'Arm Circle Shoulder Warmup':     { desc:'Stand with arms out to sides. Make small circles forward for 15 reps, then backward for 15 reps. Gradually make circles bigger.', cue:"Keep arms straight, control the speed" },
  'Cross Body Stretch shoulder':    { desc:"Pull one arm straight across your chest with the other arm. Hold 30 seconds. Switch sides. Opens up the posterior shoulder.", cue:"Stretch but don't strain" },
  'Sleeper Stretch shoulder':       { desc:'Lie on your throwing-arm side. Push your forearm down toward the ground gently. Holds the arm in internal rotation to loosen the shoulder.', cue:"Keep the elbow close to your body" },
  '90-90 Hip Stretch baseball':     { desc:'Sit on the ground with both knees bent at 90 degrees — one in front, one to the side. Sit tall and hold. Switch sides.', cue:"Keep your back straight, don't slouch" },
  'Thoracic Spine Rotation Stretch':{ desc:'Sit on heels or kneel. Place hands behind head. Rotate your upper body left and right slowly. Opens up the thoracic spine for throwing and hitting.', cue:"Rotate from the mid-back, not the lower back" },

  // THROWING
  'Long Toss 60 feet warmup':            { desc:'Partners stand 60 feet apart and throw at full effort with proper mechanics. This is your arm warm-up before any hard throwing. Builds arm strength over time.', cue:'Focus on mechanics, not just distance' },
  'Four Seam Grip Drill':                { desc:"Hold the ball across the wide seams so two seams cross your fingertips. This produces the straightest, fastest throw. Practice gripping it quickly out of your glove.", cue:'Find the seams before you throw' },
  'Crow Hop Throw Drill':                { desc:'Take a small skip-hop toward your target before releasing the throw. The crow hop transfers body weight into the throw for more power and accuracy.', cue:'Land on the same foot you hopped from' },
  'Rotator Cuff Band External Rotation': { desc:'Hold a resistance band at your side, elbow bent 90 degrees. Rotate your forearm outward against the band resistance. Keeps the rotator cuff healthy.', cue:'Feel the squeeze in your rotator cuff' },

  // FIELDING
  'Ready Position Fielding Stance': { desc:'Feet shoulder-width apart, weight on the balls of your feet, knees slightly bent, glove in front. This is the athletic position you reset to between every pitch.', cue:'Balanced base — athletic posture — eyes level' },
  'Ground Ball Forehand Drill':     { desc:"Coach rolls or hits ground balls to the fielder's glove side. Field with two hands, glove out front, charge the ball — don't wait for it.", cue:'Catch it out front, not between your legs' },
  'Ground Ball Backhand Drill':     { desc:'Ground balls hit to the throwing-hand side. Pivot on the right foot (for righties), reach across and backhand the ball. Turn and throw in one motion.', cue:'Stay low, reach across, quick transfer' },
  'Short Hop Fielding Drill':       { desc:"Coach tosses balls that bounce right in front of the fielder. Learn to read the hop and decide whether to play the long hop or the short hop — not the in-between hop.", cue:'Play the long hop or the short hop — never the in-between' },
  'First Step Fielder Reaction Drill':{ desc:'Stand in ready position. Coach points left or right and fielder explodes with a crossover step in that direction. Trains the first-step reaction every fielder needs.', cue:'Crossover first, shuffle second' },
  'Fly Ball Tracking Drill':        { desc:'Coach hits or tosses fly balls. Fielder reads the ball off the bat and gets into position under it. Focus on taking the best angle — not just running back.', cue:'Catch it above your throwing shoulder' },
  'Double Play Pivot Drill':        { desc:'Second baseman or shortstop receives a throw at second base and pivots to throw to first — all in one motion. Practice the footwork of touching the bag and clearing the runner.', cue:'Catch, pivot, throw — one smooth motion' },

  // HITTING
  'Grip and Hand Position':        { desc:"Hold the bat with the door-knocking knuckles lined up (not the big knuckles). Grip should be firm but not tight — a tight grip slows the bat down.", cue:"Hold it like you'd hold a bird — firm but not crushing" },
  'Hip Turn Drill fence':          { desc:"Stand a few inches from a fence. Practice turning your hips toward the pitcher WITHOUT letting the back elbow or bat hit the fence. Forces pure hip rotation with no arm bar.", cue:"Turn your hips, not your arms" },
  'Tee Work':                      { desc:'Hit off the batting tee focusing on one mechanical point — not trying to hit it far. Tee work is about building muscle memory in the swing, not power.', cue:'Same swing every time — consistency wins' },
  'Dry Swings':                    { desc:'Take full swings without a ball, focusing entirely on mechanics. Watch yourself in a mirror or video if possible. Great for warm-up and muscle memory.', cue:"Feel the correct movement, don't rush it" },
  'Hip Fire Drill front toss':     { desc:'Coach tosses balls from 15-20 feet in front and to the side. Batter focuses on firing the hips before the hands come through. Develops hip-led swing mechanics.', cue:'Hips fire first — hands follow' },
  'Contact Point Tee Drill inside':{ desc:'Place the tee on the inside of the plate (closer to the batter). Hit the inside pitch out in front of the plate. Teaches batters to pull the inside pitch instead of getting jammed.', cue:'Get extended out front on inside pitches' },
  'One Hand Top Hand Drill':       { desc:'Take swings using only the top hand on the bat. Builds top-hand strength and teaches the palm-down finish position through the ball.', cue:'Palm down through contact' },
  'Weight Distribution 50-50':     { desc:'Set up in your stance with weight perfectly balanced 50/50 between both feet. This is your neutral starting point before loading back.', cue:'Equal weight, stay centered' },
  'Bat Angle at Setup':            { desc:'Learn the correct bat angle at your setup position. The barrel should angle back slightly, not straight up or pointed at the pitcher.', cue:'Set the barrel in a strong, relaxed launch position' },

  // BASERUNNING
  'Primary Leadoff Stance Drill': { desc:'Lead off first base taking 2-3 shuffle steps toward second. Stay in athletic position, weight on the balls of your feet, watching the pitcher.', cue:"Be ready to go or get back — never flat-footed" },
  'Rounding First Base Arc Drill':{ desc:'Run through first base on a single but curve your path slightly into foul territory before the base so you hit it at an angle that lets you continue to second.', cue:'Hit the inside corner of the bag' },
  'Secondary Lead Timing Drill':  { desc:"As the pitcher delivers, take 2 shuffle steps toward the next base. Time it so you stop moving at the moment the catcher catches the ball.", cue:"Move when the pitcher moves, stop when the catcher catches" },

  // CONDITIONING
  'Glute Bridge Exercise':            { desc:"Lie on your back, knees bent, feet flat. Push your hips up until your body is a straight line from knees to shoulders. Hold 2 seconds, lower. Builds the hip drive used in hitting and throwing.", cue:'Squeeze your glutes at the top' },
  'Lateral Band Walk Hip':            { desc:'Put a resistance band around your ankles. Walk sideways in a squat position, keeping tension in the band. Builds hip abductors for lateral movement in the field.', cue:'Stay low, keep tension on the band' },
  'Box Jump Explosive Drill':         { desc:'Stand in front of a sturdy box. Bend into a quarter squat and jump onto the box landing softly with both feet. Builds explosive lower-body power for every baseball movement.', cue:'Land soft — absorb the impact with your legs' },
  'Rotational Medicine Ball Throw':   { desc:'Stand sideways to a wall. Hold a medicine ball at your hip, rotate explosively and throw the ball into the wall. Catches it on the return. Builds rotational power for hitting.', cue:'Drive from the hips, not the arms' },
  'Single Leg Deadlift baseball':     { desc:'Stand on one leg, hinge forward at the hip reaching the free leg back for balance. Builds single-leg stability and posterior chain strength for fielding and throwing.', cue:"Keep your back flat, hinge don't round" },
}

export const DEFAULT_DRILL_INFO = () => ({
  desc:'This drill develops fundamental baseball skills. Focus on proper mechanics each rep.',
  cue:'Consistency beats speed — same movement every time'
})
