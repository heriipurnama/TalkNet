const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const should = chai.should();

chai.use(chaiHttp);

let token = '';

before((done) => {
  chai.request(server)
    .post('/api/login')
    .send({ username: 'testuser', password: 'testpassword' })
    .end((err, res) => {
      token = res.body.token;
      done();
    });
});

describe('Profile', () => {
  it('should create a profile', (done) => {
    chai.request(server)
      .post('/api/createProfile')
      .set('Authorization', `Bearer ${token}`)
      .send({
        firstName: 'John',
        lastName: 'Doe',
        horoscope: 'Aquarius',
        zodiac: 'Tiger',
        bio: 'Just a test user.',
      })
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.have.property('message').eql('Profile created successfully');
        done();
      });
  });

  it('should get a profile', (done) => {
    chai.request(server)
      .get('/api/getProfile')
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('firstName').eql('John');
        done();
      });
  });

  it('should update a profile', (done) => {
    chai.request(server)
      .put('/api/updateProfile')
      .set('Authorization', `Bearer ${token}`)
      .send({ bio: 'Updated bio.' })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('message').eql('Profile updated successfully');
        done();
      });
  });
});
