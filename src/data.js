export const trip = {
  "title": "Dad's 70th",
  "subtitle": "Beaulieu, New Forest",
  "days": [
    {
      "id": "sat",
      "label": "Saturday",
      "note": "Drive down. One big history stop, then feet up.",
      "slots": [
        {
          "id": "sat-am",
          "title": "The stop on the way down",
          "pick": "Pick one. Leaving Hampstead by 10 makes Salisbury comfortable.",
          "options": [
            {
              "id": "salisbury",
              "name": "Salisbury Cathedral",
              "meta": "90 min there, adds about 40 min driving",
              "why": "Tallest spire in Britain, a 1215 Magna Carta in the Chapter House, and the world's oldest working clock from about 1386.",
              "access": "Level throughout. Wheelchairs available, seating everywhere.",
              "cost": "Donation, around £10 suggested",
              "cover": "Indoors",
              "best": true
            },
            {
              "id": "romsey",
              "name": "Romsey Abbey",
              "meta": "40 min there, directly on the M27",
              "why": "One of the finest Norman churches in the country, and the Saxon rood outside is over a thousand years old.",
              "access": "Flat, small, no queues. Park almost outside.",
              "cost": "Free",
              "cover": "Indoors"
            },
            {
              "id": "sarum",
              "name": "Old Sarum",
              "meta": "75 min there, next to Salisbury",
              "why": "Iron Age hillfort, Norman castle and the footprint of the original cathedral, all on one great mound.",
              "access": "Exposed, uneven, uphill. Only if he is having a good day.",
              "cost": "About £8, English Heritage",
              "cover": "Outdoors"
            },
            {
              "id": "straight",
              "name": "Straight to the hotel",
              "meta": "2h15, no detour",
              "why": "Arrive early, long lunch, and let the whole afternoon go slowly. No shame in it.",
              "access": "Nothing required.",
              "cost": "Free",
              "cover": "Either"
            }
          ]
        },
        {
          "id": "sat-lunch",
          "title": "Lunch",
          "pick": "Late is fine. You are not on a schedule.",
          "options": [
            {
              "id": "sal-lunch",
              "name": "Salisbury, Cathedral Close",
              "meta": "After the cathedral",
              "why": "The Close is the prettiest part of the city and the walk from the cathedral door is short and flat.",
              "access": "Flat.",
              "cost": "££",
              "cover": "Indoors"
            },
            {
              "id": "hotel-lunch",
              "name": "At the hotel",
              "meta": "On arrival",
              "why": "Check in, drop the bags, eat where you are standing. Least effort of anything on this list.",
              "access": "None.",
              "cost": "££",
              "cover": "Indoors"
            },
            {
              "id": "pub-lunch",
              "name": "A Beaulieu village pub",
              "meta": "Walkable from the hotel",
              "why": "Village setting, river at the bottom of the road, and he gets a proper first pint of the weekend.",
              "access": "Short flat walk.",
              "cost": "££",
              "cover": "Indoors"
            }
          ]
        },
        {
          "id": "sat-pm",
          "title": "Afternoon",
          "pick": "Optional. Skip the lot if the drive was enough.",
          "options": [
            {
              "id": "settle",
              "name": "Settle in and do nothing",
              "meta": "Hotel lounge",
              "why": "Fire, papers, a drink. This is what he said he wanted.",
              "access": "None.",
              "cost": "Free",
              "cover": "Indoors",
              "best": true
            },
            {
              "id": "riverwalk",
              "name": "Beaulieu Mill Dam and river",
              "meta": "10 min stroll",
              "why": "The millpond and the view back to the village is the postcard shot. Benches along it.",
              "access": "Flat, short, easy to turn back.",
              "cost": "Free",
              "cover": "Outdoors"
            },
            {
              "id": "exbury",
              "name": "Exbury Gardens",
              "meta": "15 min drive",
              "why": "Rothschild estate gardens with a steam railway that does a 20-minute loop, so he sees it all sitting down.",
              "access": "Train removes the walking. Check last departure.",
              "cost": "£££",
              "cover": "Outdoors"
            }
          ]
        },
        {
          "id": "sat-dinner",
          "title": "Birthday dinner",
          "pick": "Book it the moment you check in, not at 7pm.",
          "options": [
            {
              "id": "hotel-dinner",
              "name": "The hotel restaurant",
              "meta": "No driving",
              "why": "The obvious right answer for a 70th. Nobody drives, nobody rushes, and he goes upstairs afterwards.",
              "access": "None.",
              "cost": "£££",
              "cover": "Indoors",
              "best": true
            },
            {
              "id": "masterbuilders",
              "name": "The Master Builder's, Buckler's Hard",
              "meta": "6 min drive",
              "why": "Riverside inn on the old shipbuilding street. Worth it if you want one evening out.",
              "access": "Flat, park close.",
              "cost": "£££",
              "cover": "Indoors"
            },
            {
              "id": "pig",
              "name": "The Pig, Brockenhurst",
              "meta": "15 min drive",
              "why": "Kitchen-garden cooking in a forest house. Very good, books up fast, ring today.",
              "access": "Gravel drive, otherwise level.",
              "cost": "£££",
              "cover": "Indoors"
            }
          ]
        }
      ]
    },
    {
      "id": "sun",
      "label": "Sunday",
      "note": "The forest day. Most of it can be done from the car.",
      "slots": [
        {
          "id": "sun-am",
          "title": "Morning",
          "pick": "Beaulieu is on your doorstep and the ticket lasts all day.",
          "options": [
            {
              "id": "beaulieu",
              "name": "Beaulieu Abbey and Palace House",
              "meta": "Walk from hotel, 2 to 3 hrs",
              "why": "Cistercian abbey founded by King John in 1204, plus Palace House and the Motor Museum on one ticket.",
              "access": "Monorail and veteran bus on site cut out most of the walking.",
              "cost": "££ one ticket, all day",
              "cover": "Both",
              "best": true
            },
            {
              "id": "bucklers",
              "name": "Buckler's Hard",
              "meta": "6 min drive, 1 to 2 hrs",
              "why": "Georgian shipbuilding village where Nelson's ships were built. One short street, museum, cafe at the end.",
              "access": "One flat street. Genuinely easy.",
              "cost": "££",
              "cover": "Both"
            },
            {
              "id": "cruise",
              "name": "Beaulieu River cruise",
              "meta": "30 min, from Buckler's Hard",
              "why": "Best views of the estuary and he never leaves his seat. Weather dependent, so ring ahead.",
              "access": "Step down into the boat. Ask about assistance.",
              "cost": "£",
              "cover": "Outdoors"
            }
          ]
        },
        {
          "id": "sun-lunch",
          "title": "Lunch",
          "pick": "",
          "options": [
            {
              "id": "lymington",
              "name": "Lymington",
              "meta": "15 min drive",
              "why": "Georgian quay town, cobbled street down to the water, plenty of places to eat and watch boats.",
              "access": "The quay street is cobbled and slopes. Park at the top.",
              "cost": "££",
              "cover": "Indoors"
            },
            {
              "id": "mb-lunch",
              "name": "The Master Builder's",
              "meta": "6 min drive",
              "why": "If you are already at Buckler's Hard, you are already there.",
              "access": "Flat.",
              "cost": "££",
              "cover": "Indoors"
            },
            {
              "id": "burley",
              "name": "Burley village",
              "meta": "25 min drive",
              "why": "Thatched cottages, ponies wandering through, tea rooms and the Queen's Head. Very picture-book.",
              "access": "Small and flat.",
              "cost": "££",
              "cover": "Indoors"
            }
          ]
        },
        {
          "id": "sun-pm",
          "title": "The pony and forest run",
          "pick": "All of this works from the car if it rains.",
          "options": [
            {
              "id": "rhinefield",
              "name": "Rhinefield Ornamental Drive",
              "meta": "Scenic drive, 30 min",
              "why": "Giant redwoods and Douglas firs planted in 1859, lining the road. Ponies on the tarmac throughout.",
              "access": "Entirely from the car. Pull-ins along the way.",
              "cost": "Parking only",
              "cover": "Either",
              "best": true
            },
            {
              "id": "bolderwood",
              "name": "Bolderwood Deer Sanctuary",
              "meta": "Short flat walk",
              "why": "Viewing platform overlooking a meadow where the fallow deer come out. Best late afternoon.",
              "access": "Level gravel path, a few hundred yards.",
              "cost": "Parking only",
              "cover": "Outdoors"
            },
            {
              "id": "brock",
              "name": "Brockenhurst village and the ford",
              "meta": "Tea or a pint",
              "why": "Ponies and cattle wander the actual streets, and there is a water splash in the middle of the village.",
              "access": "Flat. Park and watch.",
              "cost": "Free",
              "cover": "Either"
            },
            {
              "id": "lyndhurst",
              "name": "New Forest Centre, Lyndhurst",
              "meta": "Indoors, 1 hr",
              "why": "The forest's story from William the Conqueror onwards. The rain plan that is not the hotel bar.",
              "access": "Level, small museum.",
              "cost": "£",
              "cover": "Indoors"
            }
          ]
        }
      ]
    },
    {
      "id": "mon",
      "label": "Monday",
      "note": "One last stop on the road home. Check out around 10:30.",
      "slots": [
        {
          "id": "mon-am",
          "title": "On the way back",
          "pick": "Winchester costs you almost no extra driving. You are on the M3 anyway.",
          "options": [
            {
              "id": "winchester",
              "name": "Winchester",
              "meta": "40 min, 2 to 3 hrs there",
              "why": "Anglo-Saxon and Norman capital of England. Cathedral with the longest nave in Europe, Norman crypt, and the Round Table in the Great Hall five minutes away.",
              "access": "Flat, indoors, benches throughout. The best bad-weather option of the weekend.",
              "cost": "££",
              "cover": "Indoors",
              "best": true
            },
            {
              "id": "christchurch",
              "name": "Christchurch Priory",
              "meta": "30 min, wrong direction",
              "why": "Superb Norman priory and castle ruins by the quay. Lovely, but it sends you west before you turn for home.",
              "access": "Flat.",
              "cost": "Donation",
              "cover": "Indoors"
            },
            {
              "id": "rufus",
              "name": "The Rufus Stone",
              "meta": "20 min, roadside",
              "why": "Where William II took an arrow in 1100. Five minutes, one stone, a good story to tell in the car.",
              "access": "Short walk from the layby.",
              "cost": "Free",
              "cover": "Outdoors"
            },
            {
              "id": "home",
              "name": "Straight home",
              "meta": "2h15",
              "why": "Beat the traffic, end on a high, do not push it on the last day.",
              "access": "None.",
              "cost": "Free",
              "cover": "Either"
            }
          ]
        },
        {
          "id": "mon-lunch",
          "title": "Last lunch",
          "pick": "",
          "options": [
            {
              "id": "wykeham",
              "name": "The Wykeham Arms, Winchester",
              "meta": "By the cathedral",
              "why": "Eighteenth-century pub tucked behind the Close, fires, old school desks for tables. A proper last stop.",
              "access": "Short flat walk from the cathedral.",
              "cost": "££",
              "cover": "Indoors"
            },
            {
              "id": "refectory",
              "name": "Cathedral refectory",
              "meta": "On site",
              "why": "Zero extra walking, right by the cloister. The easy option.",
              "access": "None.",
              "cost": "£",
              "cover": "Indoors"
            },
            {
              "id": "roadside",
              "name": "Eat on the road",
              "meta": "M3",
              "why": "If he is tired, get him home. Nobody remembers the last lunch.",
              "access": "None.",
              "cost": "£",
              "cover": "Indoors"
            }
          ]
        }
      ]
    }
  ]
};

export const totalSlots = trip.days.reduce((n, d) => n + d.slots.length, 0);
