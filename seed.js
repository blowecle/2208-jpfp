//old seed file

// const { db } = require('./server/db')
// const Student = require('./server/db/student')
// const Campus = require('./server/db/campus')

// const students = [{
//     firstName: 'Bill',
//     lastName: 'Lumbergh',
//     email: 'b.lumbergh@initech.com',
//     imgUrl: 'https://miro.medium.com/max/800/1*u5DljyraEV-nDCWIGoN9NQ.jpeg',
//     gpa: 3.5
// },
// {
//     firstName: 'Milton',
//     lastName: 'Waddams',
//     email: 'm.waddams@initech.com',
//     imgUrl: 'https://m.media-amazon.com/images/I/61Karh0a+uL._AC_SY679_.jpg',
//     gpa: 2.0
// },
// {
//     firstName: 'Peter',
//     lastName: 'Gibbons',
//     email: 'p.gibbons@initech.com',
//     imgUrl: 'https://44.media.tumblr.com/9361b00634f9b6cda198be602943a717/tumblr_mfrjloYC0G1s1kqrno1_500.gif',
//     gpa: 3.0
// },
// {
//     firstName: 'Michael',
//     lastName: 'Bolton',
//     email: 'm.bolton@initech.com',
//     imgUrl: 'https://sm.ign.com/t/ign_ap/articlepage/f/funny-or-d/funny-or-die-gets-michael-bolton-to-recreate-micha_1yph.1280.jpg',
//     gpa: 4.0
// },]

// const campuses = [{
//     name: 'Ohio State University',
//     address: ' 281 W Lane Ave, Columbus, OH 43210',
//     description: 'The Ohio State University, commonly called Ohio State or OSU, is a public land-grant research university in Columbus, Ohio. A member of the University System of Ohio, it has been ranked by major institutional rankings among the best public universities in the United States.',
//     imgUrl: 'https://imageio.forbes.com/specials-images/imageserve/5f5e4bd9f5e52c52acbcd758/The-Oval-campus-lawn-park-Ohio/960x0.jpg?format=jpg&width=960',
// },
// {
//     name: 'University of Cincinnati',
//     address: '2600 Clifton Ave, Cincinnati, OH 45221',
//     description: 'The University of Cincinnati is a public research university in Cincinnati, Ohio. Founded in 1819 as Cincinnati College, it is the oldest institution of higher education in Cincinnati and has an annual enrollment of over 44,000 students, making it the second largest university in Ohio.',
//     imgUrl: 'https://www.hargreaves.com/wp-content/uploads/2016/10/Hargreaves-Associates-Master-Plan-Background.jpg',
// },
// ]

// const seed = async () => {
//     try {
//       await db.sync({ force: true });
      
//       await Promise.all(
//           campuses.map(campus =>
//             Campus.create(campus))
//       )

//       await Promise.all(
//         students.map(student => 
//             Student.create(student))
//       )
//     } catch(err){
//         console.error(err)
//     }
// }

// seed().catch(err => {
//     console.error(err);
// })