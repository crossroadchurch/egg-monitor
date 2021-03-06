import { eggs } from '../qr_codes/easter-data.json'
import Page from '../components/page'
import TeamStat from '../components/teamstat'
import EggStat from '../components/eggstat'
import Activity from '../components/activity'
import { useState, useEffect } from 'react'
import initFirebase from '../lib/firebase'
initFirebase()

import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/database'
const db = firebase.firestore()
const team_doc = db.collection('teams')
export default () => {
  const [teamdata, setTeamdata] = useState([])
  const [lastactive, setLastactive] = useState({
    team: 'Nobody',
    ...eggs[0],
    timestamp: '2000-01-01 00:00:00'
  })
  const [eggdata, setEggdata] = useState(
    eggs.map((egg) => {
      return { ...egg, found_count: 0, last_found: '2000-01-01 00:00:00' }
    })
  )

  useEffect(() => {
    const unsubscribe = team_doc.onSnapshot((snapshot) => {
      if (snapshot.size) {
        let new_data = []
        let activity = {
          team: 'Nobody',
          ...eggs[0],
          timestamp: '2000-01-01 00:00:00'
        }
        let cur_eggs = eggs.map((egg) => {
          return { ...egg, found_count: 0, last_found: '2000-01-01 00:00:00' }
        })
        snapshot.forEach((team) => {
          let egg_count = team.data().eggs ? team.data().eggs.length : 0
          new_data.push({ ...team.data(), egg_count: egg_count })
          if (egg_count > 0) {
            team.data().eggs.forEach((egg) => {
              let idx = parseInt(egg.id)
              cur_eggs[idx] = {
                ...cur_eggs[idx],
                found_count: cur_eggs[idx].found_count + 1,
                last_found:
                  cur_eggs[idx].last_found > egg.found
                    ? cur_eggs[idx].last_found
                    : egg.found
              }
              if (egg.found > activity.timestamp) {
                activity = {
                  team: team.data().name,
                  ...cur_eggs[idx],
                  timestamp: egg.found
                }
              }
            })
          }
        })
        // Sort data by egg count (desc), then by name (asc)
        new_data.sort((a, b) =>
          a.egg_count < b.egg_count
            ? 1
            : a.egg_count === b.egg_count
            ? a.name > b.name
              ? 1
              : -1
            : -1
        )
        let high_scores = [
          ...new Set(
            new_data.map((team) => {
              return team.egg_count
            })
          ),
          ...[-1, -1, -1]
        ] // [-1, -1, -1] ensures that high_scores has at least 3 elements
        let placed_data = new_data.map((team) => {
          let team_place =
            team.egg_count === high_scores[0]
              ? 'first_place'
              : team.egg_count === high_scores[1]
              ? 'second_place'
              : team.egg_count === high_scores[2]
              ? 'third_place'
              : `${team.egg_count}_eggs`
          return { ...team, place: team_place }
        })
        setTeamdata(placed_data)
        setEggdata(cur_eggs)
        setLastactive(activity)
      } else {
        console.log('Snapshot has no data')
      }
    })
  }, [team_doc])

  return (
    <Page>
      <div className="bg-yellow-200">
        <main className="max-w-sm mx-auto p-8 pt-12 bg-white">
          <div className="min-h-screen text-center pt-2">
            <h1 className="text-4xl font-bold mb-1">Trail Watch</h1>
            <h2 className="text-2xl font-bold mb-1">Latest activity</h2>
            <section>
              <Activity {...lastactive} />
            </section>
            <h2 className="text-2xl font-bold mb-1">Leaderboard</h2>
            <section>
              {teamdata.map((team) => {
                return <TeamStat key={team.id} {...team} />
              })}
            </section>
            <h2 className="pt-4 text-2xl font-bold mb-1">Egg Statistics</h2>
            <section>
              {eggdata.map((egg, index) => {
                return <EggStat key={index} {...egg} />
              })}
            </section>
          </div>
        </main>
      </div>
    </Page>
  )
}
