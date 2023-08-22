const launches = new Map();

let latestFlightNumber = 100;

const launch = {
    flightNumber: 100,
    mission:'Kepler exploration X',
    rocket: 'Explorer IS1',
    launchDate: new Date('December 27, 2030'),
    target: 'kepler-442 b',
    customer: ['NASA','ZTM'],
    upcoming: true,
    success: true,
}

launches.set(launch.flightNumber, launch);

function getAllLaunches() {
    return Array.from(launches.values());
}

function addNewLaunch(launch) {
    latestFlightNumber++;
    launches.set(
        latestFlightNumber,
        Object.assign(launch, {
            success: true,
            upcoming: true,
            customers: ['zero to mastery', 'NASA'],
            flightNumber: latestFlightNumber,

        })
    );
}

module.exports = {
    getAllLaunches,
    addNewLaunch
}