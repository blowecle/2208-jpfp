
// The purpose of this module is to bring your Sequelize instance (`db`) together
// with your models, for which you'll find some blank files in this directory:

const db = require('./database')
const Student = require('./student')
const Campus = require('./campus')

const students = [{
  firstName: 'Bill',
  lastName: 'Lumbergh',
  email: 'b.lumbergh@initech.com',
  imgUrl: 'https://miro.medium.com/max/800/1*u5DljyraEV-nDCWIGoN9NQ.jpeg',
  gpa: 3.5,
  campusId: 1
},
{
  firstName: 'Milton',
  lastName: 'Waddams',
  email: 'm.waddams@initech.com',
  imgUrl: 'https://m.media-amazon.com/images/I/61Karh0a+uL._AC_SY679_.jpg',
  gpa: 2.0,
  campusId: 1
},
{
  firstName: 'Peter',
  lastName: 'Gibbons',
  email: 'p.gibbons@initech.com',
  imgUrl: 'https://44.media.tumblr.com/9361b00634f9b6cda198be602943a717/tumblr_mfrjloYC0G1s1kqrno1_500.gif',
  gpa: 3.0,
  campusId: 2
},
{
  firstName: 'Michael',
  lastName: 'Bolton',
  email: 'm.bolton@initech.com',
  imgUrl: 'https://sm.ign.com/t/ign_ap/articlepage/f/funny-or-d/funny-or-die-gets-michael-bolton-to-recreate-micha_1yph.1280.jpg',
  gpa: 4.0,
  campusId: 2
},
{
  firstName: 'Tom',
  lastName: 'Smykowski',
  email: 't.smykowski@initech.com',
  imgUrl: 'https://i.pinimg.com/originals/d5/29/d7/d529d72e65adb201168e2e8a10d9e383.jpg',
  gpa: 3.7,
  campusId: 1
},
{
  firstName: 'Samir',
  lastName: 'Nagheenanajar',
  email: 's.nagheenanajar@initech.com',
  imgUrl: 'https://64.media.tumblr.com/4a0f787833228689cbec6cd578bfcb0f/tumblr_mfrj343AYO1s1kqrno1_1280.jpg',
  gpa: 4.0,
  campusId: 2
},
{
  firstName: 'Bob',
  lastName: 'Slydell',
  email: 'bob.s@bobs.com',
  imgUrl: 'https://pbs.twimg.com/profile_images/960941823937208320/OBCDL_f6_400x400.jpg',
  gpa: 1.0,
  campusId: null
},
{}
]

const campuses = [{
  name: 'Ohio State University',
  address: ' 281 W Lane Ave, Columbus, OH 43210',
  description: 'The Ohio State University, commonly called Ohio State or OSU, is a public land-grant research university in Columbus, Ohio. A member of the University System of Ohio, it has been ranked by major institutional rankings among the best public universities in the United States.',
  imgUrl: 'https://imageio.forbes.com/specials-images/imageserve/5f5e4bd9f5e52c52acbcd758/The-Oval-campus-lawn-park-Ohio/960x0.jpg?format=jpg&width=960',
},
{
  name: 'University of Cincinnati',
  address: '2600 Clifton Ave, Cincinnati, OH 45221',
  description: 'The University of Cincinnati is a public research university in Cincinnati, Ohio. Founded in 1819 as Cincinnati College, it is the oldest institution of higher education in Cincinnati and has an annual enrollment of over 44,000 students, making it the second largest university in Ohio.',
  imgUrl: 'https://www.hargreaves.com/wp-content/uploads/2016/10/Hargreaves-Associates-Master-Plan-Background.jpg',
},
]

const seed = async () => {
  try {
    await db.sync({ force: true });
    
    await Promise.all(
        campuses.map(campus =>
          Campus.create(campus))
    )

    await Promise.all(
      students.map(student => 
          Student.create(student))
    )
  } catch(err){
      console.error(err)
  }
}


const syncAndSeed = async () => {
    await db.sync({ force: true });
    seed().catch(err => {
      console.error(err);
    })
    console.log(`
    Seeding successful!
  `);
};


Student.belongsTo(Campus)
Campus.hasMany(Student)

module.exports = {
    // Include your models in this exports object as well!
    Campus,
    Student,
    db,
    syncAndSeed,
}