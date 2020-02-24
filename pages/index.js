import { eggs } from '../qr_codes/easter-data.json'
import Page from '../components/page'
import TeamStat from '../components/teamstat'
import EggStat from '../components/eggstat'
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
  const [eggdata, setEggdata] = useState(
    eggs.map((egg) => {
      return { ...egg, found_count: 0, last_found: '2000-01-01 00:00:00' }
    })
  )

  useEffect(() => {
    const unsubscribe = team_doc.onSnapshot((snapshot) => {
      if (snapshot.size) {
        let new_data = []
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
        setTeamdata(new_data)
        setEggdata(cur_eggs)
      } else {
        console.log('Snapshot has no data')
      }
    })
  }, [team_doc])

  return (
    <Page>
      <div>
        <main className="max-w-sm mx-auto p-4 pt-12">
          <div className="min-h-screen text-center pt-2">
            <h1 className="text-4xl font-bold mb-1 whitespace-no-wrap">
              Leaderboard
            </h1>
            <section>
              {teamdata.map((team) => {
                return <TeamStat key={team.id} {...team} />
              })}
            </section>
            <h1 className="pt-4 text-2xl font-bold mb-1 whitespace-no-wrap">
              Egg Statistics
            </h1>
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
