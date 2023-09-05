const launchesDatabase = require('./launches.mongo');
const planets = require('./planets.mongo');

const DEFAULT_FLIGHT_NUMBER = 100;

const launches = new Map();


const launch = {
    flightNumber: 100,
    mission:'Kepler exploration X',
    rocket: 'Explorer IS1',
    launchDate: new Date('December 27, 2030'),
    target: 'Kepler-442 b',
    customer: ['NASA','ZTM'],
    upcoming: true,
    success: true,
}


saveLaunch(launch);

function existsLaunchWithId(launchId) {
    return launches.has(launchId);
}

//Auto_Increment /(-flightNumber) means decrement order.
async function getLatestFlightNumber() {
    const latestLaunch = await launchesDatabase
      .findOne()
      .sort('-flightNumber');
    
    if (!latestLaunch) {
        return DEFAULT_FLIGHT_NUMBER;
    }
    return latestLaunch.flightNumber;
}

//list launches.
async function getAllLaunches() {
    return await launchesDatabase
    .find({},{
        '_id': 0,
        '__v':0
    });
}

//save launches and create a strict rule  about the name of planets.We use findOneAndUpdate for hide informations.
async function saveLaunch(launch) {
    const planet = await planets.findOne({
        keplerName: launch.target,
    });
    if (!planet) {
        throw new Error('No matching planet found')
    }
    await launchesDatabase.findOneAndUpdate({
        flightNumber: launch.flightNumber,
    }, launch, {
        upsert: true
    });
}

//Insert launch in db
async function scheduleNewLaunch(launch) {
    const newFlightNumber = await getLatestFlightNumber() + 1;
    const newLaunch = Object.assign(launch, {
        success: true,
        upcoming: true,
        customers: ['zero to mastery', 'NASA'],
        flightNumber: newFlightNumber,
    });

    await saveLaunch(newLaunch);
}


function abortLaunchById(launchId) {
    const aborted =  launches.get(launchId);
    aborted.upcoming = false;
    aborted.success = false;
    return aborted;
}

module.exports = {
    existsLaunchWithId,
    getAllLaunches,
    scheduleNewLaunch,
    abortLaunchById
}