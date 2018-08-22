
var should = require('chai').should(),
    expect = require('chai').expect,
    supertest = require('supertest'),
    preview = "http://preview.airwallex.com:30001"
    demo = "http://demo.airwallex.com:30001"
    api = supertest(preview);

describe('User', function () {
    it('should return a 200 response', function (done) {
        api.post('/bank')
            .set('Accept', 'application/json')
            .send({
                payment_method: "SWIFT",
                bank_country_code: "US",
                account_name: "John Smith",
                account_number: "123",
                swift_code: "ICBCUSBJ",
                aba: "11122233A"
            })
            .expect(200, done);
    });

    it('response should be an object with keys and values', function (done) {
        api.post('/bank')
            .set('Accept', 'application/json')
            .send({
                payment_method: "SWIFT",
                bank_country_code: "US",
                account_name: "John Smith",
                account_number: "123",
                swift_code: "ICBCUSBJ",
                aba: "11122233A"
            })
            .end(function (err, res) {
              expect(res.body).to.have.property("success");
              expect(res.body.success).to.equal('Bank details saved');
                done();
            });
    });

    it('payment method field is mandatory', function (done) {
        api.post('/bank')
            .set('Accept', 'application/json')
            .send({
                bank_country_code: "US",
                account_name: "John Smith",
                account_number: "123",
                swift_code: "ICBCUSBJ",
                aba: "11122233A"
            })
            .expect(400)
            .end(function (err, res) {
                if (err) return done(err);
                expect(res.body.error).to.equal("'payment_method' field required, the value should be either 'LOCAL' or 'SWIFT'");
                done();
            });
    });

    it('payment method can be SWIFT', function (done) {
        api.post('/bank')
            .set('Accept', 'application/json')
            .send({
                payment_method: "SWIFT",
                bank_country_code: "US",
                account_name: "John Smith",
                account_number: "123",
                swift_code: "ICBCUSBJ",
                aba: "11122233A"
            })
            .end(function (err, res) {
              expect(res.body).to.have.property("success");
              expect(res.body.success).to.equal('Bank details saved');
                done();
            });
    });

    it('payment method can be LOCAL', function (done) {
        api.post('/bank')
            .set('Accept', 'application/json')
            .send({
                payment_method: "LOCAL",
                bank_country_code: "US",
                account_name: "John Smith",
                account_number: "123",
                swift_code: "ICBCUSBJ",
                aba: "11122233A"
            })
            .end(function (err, res) {
              expect(res.body).to.have.property("success");
              expect(res.body.success).to.equal('Bank details saved');
                done();
            });
    });

    it('payment method field should be only LOCAL or SWIFT', function (done) {
        api.post('/bank')
            .set('Accept', 'application/json')
            .send({
                payment_method: "something",
                bank_country_code: "US",
                account_name: "John Smith",
                account_number: "123",
                swift_code: "ICBCUSBJ",
                aba: "11122233A"
            })
            .expect(400)
            .end(function (err, res) {
                if (err) return done(err);
                expect(res.body.error).to.equal("'payment_method' field required, the value should be either 'LOCAL' or 'SWIFT'");
                done();
            });
    });

    it('payment method field error message is consistent for null value', function (done) {
        api.post('/bank')
            .set('Accept', 'application/json')
            .send({
                payment_method: "",
                bank_country_code: "US",
                account_name: "John Smith",
                account_number: "123",
                swift_code: "ICBCUSBJ",
                aba: "11122233A"
            })
            .expect(400)
            .end(function (err, res) {
                if (err) return done(err);
                expect(res.body.error).to.equal("'payment_method' field required, the value should be either 'LOCAL' or 'SWIFT'");
                done();
            });
    });

    it('payment method field error message is consistent for invalid charecter', function (done) {
        api.post('/bank')
            .set('Accept', 'application/json')
            .send({
                payment_method: "#$%",
                bank_country_code: "US",
                account_name: "John Smith",
                account_number: "123",
                swift_code: "ICBCUSBJ",
                aba: "11122233A"
            })
            .expect(400)
            .end(function (err, res) {
                if (err) return done(err);
                expect(res.body.error).to.equal("'payment_method' field required, the value should be either 'LOCAL' or 'SWIFT'");
                done();
            });
    });

it('bank country code field is mandatory', function (done) {
    api.post('/bank')
        .set('Accept', 'application/json')
        .send({
            payment_method: "LOCAL",
            account_name: "John Smith",
            account_number: "123",
            swift_code: "ICBCUSBJ",
            aba: "11122233A"
        })
        .expect(400)
        .end(function (err, res) {
            if (err) return done(err);
            expect(res.body.error).to.equal("'bank_country_code' is required, and should be one of 'US', 'AU', or 'CN'");
            done();
        });
});

it('bank country code can be US', function (done) {
    api.post('/bank')
        .set('Accept', 'application/json')
        .send({
            payment_method: "SWIFT",
            bank_country_code: "US",
            account_name: "John Smith",
            account_number: "123",
            swift_code: "ICBCUSBJ",
            aba: "11122233A"
        })
        .end(function (err, res) {
          expect(res.body).to.have.property("success");
          expect(res.body.success).to.equal('Bank details saved');
            done();
        });
});

it('bank country code can be AU', function (done) {
    api.post('/bank')
        .set('Accept', 'application/json')
        .send({
            payment_method: "SWIFT",
            bank_country_code: "AU",
            account_name: "John Smith",
            account_number: "1234567",
            swift_code: "ICBCAUBJ",
            bsb: "123456",
            aba: "11122233A"
        })
        .end(function (err, res) {
          expect(res.body).to.have.property("success");
          expect(res.body.success).to.equal('Bank details saved');
            done();
        });
});

it('bank country code can be CN', function (done) {
    api.post('/bank')
        .set('Accept', 'application/json')
        .send({
            payment_method: "LOCAL",
            bank_country_code: "CN",
            account_name: "John Smith",
            account_number: "1234567",
            swift_code: "ICBCUSBJ",
            aba: "11122233A"
        })
        .end(function (err, res) {
          expect(res.body).to.have.property("success");
          expect(res.body.success).to.equal('Bank details saved');
            done();
        });
});

it('babk country code field should be only US, AU or CN', function (done) {
    api.post('/bank')
        .set('Accept', 'application/json')
        .send({
            payment_method: "LOCAL",
            bank_country_code: "USA",
            account_name: "John Smith",
            account_number: "123",
            swift_code: "ICBCUSBJ",
            aba: "11122233A"
        })
        .expect(400)
        .end(function (err, res) {
            if (err) return done(err);
            expect(res.body.error).to.equal("'bank_country_code' is required, and should be one of 'US', 'AU', or 'CN'");
            done();
        });
});

it('bank country code field error message is consistent for null value', function (done) {
    api.post('/bank')
        .set('Accept', 'application/json')
        .send({
            payment_method: "LOCAL",
            bank_country_code: "",
            account_name: "John Smith",
            account_number: "123",
            swift_code: "ICBCUSBJ",
            aba: "11122233A"
        })
        .expect(400)
        .end(function (err, res) {
            if (err) return done(err);
            expect(res.body.error).to.equal("'bank_country_code' is required, and should be one of 'US', 'AU', or 'CN'");
            done();
        });
});

it('bank country code field error message is consistent for invalid charecter', function (done) {
    api.post('/bank')
        .set('Accept', 'application/json')
        .send({
            payment_method: "SWIFT",
            bank_country_code: "#$%",
            account_name: "John Smith",
            account_number: "123",
            swift_code: "ICBCUSBJ",
            aba: "11122233A"
        })
        .expect(400)
        .end(function (err, res) {
            if (err) return done(err);
            expect(res.body.error).to.equal("'bank_country_code' is required, and should be one of 'US', 'AU', or 'CN'");
            done();
        });
});

it('account name field is mandatory', function (done) {
    api.post('/bank')
        .set('Accept', 'application/json')
        .send({
            payment_method: "LOCAL",
            bank_country_code: "US",
            account_number: "123",
            swift_code: "ICBCUSBJ",
            aba: "11122233A"
        })
        .expect(400)
        .end(function (err, res) {
            if (err) return done(err);
            expect(res.body.error).to.equal("'account_name' is required");
            done();
        });
});

it('account name can be any character length between 2 and 10', function (done) {
    api.post('/bank')
        .set('Accept', 'application/json')
        .send({
            payment_method: "SWIFT",
            bank_country_code: "US",
            account_name: "John",
            account_number: "123",
            swift_code: "ICBCUSBJ",
            aba: "11122233A"
        })
        .end(function (err, res) {
          expect(res.body).to.have.property("success");
          expect(res.body.success).to.equal('Bank details saved');
            done();
        });
});

it('account name can be special character length between 2 and 10', function (done) {
    api.post('/bank')
        .set('Accept', 'application/json')
        .send({
            payment_method: "SWIFT",
            bank_country_code: "US",
            account_name: "$%^",
            account_number: "123",
            swift_code: "ICBCUSBJ",
            aba: "11122233A"
        })
        .end(function (err, res) {
          expect(res.body).to.have.property("success");
          expect(res.body.success).to.equal('Bank details saved');
            done();
        });
});

it('account name can be numerics of length between 2 and 10', function (done) {
    api.post('/bank')
        .set('Accept', 'application/json')
        .send({
            payment_method: "SWIFT",
            bank_country_code: "US",
            account_name: "123",
            account_number: "123",
            swift_code: "ICBCUSBJ",
            aba: "11122233A"
        })
        .end(function (err, res) {
          expect(res.body).to.have.property("success");
          expect(res.body.success).to.equal('Bank details saved');
            done();
        });
});

it('account name field cannot be of length less than 2', function (done) {
    api.post('/bank')
        .set('Accept', 'application/json')
        .send({
            payment_method: "LOCAL",
            bank_country_code: "US",
            account_name: "a",
            account_number: "123",
            swift_code: "ICBCUSBJ",
            aba: "11122233A"
        })
        .expect(400)
        .end(function (err, res) {
            if (err) return done(err);
            expect(res.body.error).to.equal("Length of account_name should be between 2 and 10");
            done();
        });
});

it('account name field cannot be of length more than 10', function (done) {
    api.post('/bank')
        .set('Accept', 'application/json')
        .send({
            payment_method: "LOCAL",
            bank_country_code: "US",
            account_name: "12345678900",
            account_number: "123",
            swift_code: "ICBCUSBJ",
            aba: "11122233A"
        })
        .expect(400)
        .end(function (err, res) {
            if (err) return done(err);
            expect(res.body.error).to.equal("Length of account_name should be between 2 and 10");
            done();
        });
});

it('account number field is mandatory', function (done) {
    api.post('/bank')
        .set('Accept', 'application/json')
        .send({
            payment_method: "LOCAL",
            bank_country_code: "US",
            account_name: "shiva vupp",
            swift_code: "ICBCUSBJ",
            aba: "11122233A"
        })
        .expect(400)
        .end(function (err, res) {
            if (err) return done(err);
            expect(res.body.error).to.equal("'account_number' is required");
            done();
        });
});

it('account number for US can be any numeric character length between 1 and 17', function (done) {
    api.post('/bank')
        .set('Accept', 'application/json')
        .send({
            payment_method: "SWIFT",
            bank_country_code: "US",
            account_name: "John",
            account_number: "123",
            swift_code: "ICBCUSBJ",
            aba: "11122233A"
        })
        .end(function (err, res) {
          expect(res.body).to.have.property("success");
          expect(res.body.success).to.equal('Bank details saved');
            done();
        });
});

it('account number for US can be any special character length between 1 and 17', function (done) {
    api.post('/bank')
        .set('Accept', 'application/json')
        .send({
            payment_method: "SWIFT",
            bank_country_code: "US",
            account_name: "John",
            account_number: "#$%",
            swift_code: "ICBCUSBJ",
            aba: "11122233A"
        })
        .end(function (err, res) {
          expect(res.body).to.have.property("success");
          expect(res.body.success).to.equal('Bank details saved');
            done();
        });
});

it('account number for US can be any non numeric character length between 1 and 17', function (done) {
    api.post('/bank')
        .set('Accept', 'application/json')
        .send({
            payment_method: "SWIFT",
            bank_country_code: "US",
            account_name: "John",
            account_number: "ab",
            swift_code: "ICBCUSBJ",
            aba: "11122233A"
        })
        .end(function (err, res) {
          expect(res.body).to.have.property("success");
          expect(res.body.success).to.equal('Bank details saved');
            done();
        });
});

it('account number for US cannot be of length more than 17', function (done) {
    api.post('/bank')
        .set('Accept', 'application/json')
        .send({
            payment_method: "LOCAL",
            bank_country_code: "US",
            account_name: "12345678",
            account_number: "123456789123456789",
            swift_code: "ICBCUSBJ",
            aba: "11122233A"
        })
        .expect(400)
        .end(function (err, res) {
            if (err) return done(err);
            console.log("This test failed due to requirement MisMatch, defect logged for the same. Once issue is fixed at API this test will automatically pass");
            expect(res.body.error).to.equal("Length of account_number should be between 1 and 17 when bank_country_code is 'US'");
            done();
        });
});


it('account number for AU cannot be of length more than 9', function (done) {
    api.post('/bank')
        .set('Accept', 'application/json')
        .send({
            payment_method: "LOCAL",
            bank_country_code: "AU",
            account_name: "12345678",
            account_number: "123456789123456789",
            swift_code: "ICBCAUBJ",
            aba: "11122233A",
            bsb: "123456"
        })
        .expect(400)
        .end(function (err, res) {
            if (err) return done(err);
            console.log("This test failed due to requirement MisMatch, defect logged for the same. Once issue is fixed at API this test will automatically pass");
            expect(res.body.error).to.equal("Length of account_number should be between 6 and 9 when bank_country_code is 'AU'");
            done();
        });
});

it('account number for CN cannot be of length less than 8', function (done) {
    api.post('/bank')
        .set('Accept', 'application/json')
        .send({
            payment_method: "LOCAL",
            bank_country_code: "CN",
            account_name: "12345678",
            account_number: "1234",
            swift_code: "ICBCCNBJ",
            aba: "11122233A",
            bsb: "123456"
        })
        .expect(400)
        .end(function (err, res) {
            if (err) return done(err);
            console.log("This test failed due to requirement MisMatch, defect logged for the same. Once issue is fixed at API this test will automatically pass");
            expect(res.body.error).to.equal("Length of account_number should be between 8 and 20 when bank_country_code is 'CN'");
            done();
        });
});

it('swift code field is mandatory when payment method is SWIFT', function (done) {
    api.post('/bank')
        .set('Accept', 'application/json')
        .send({
            payment_method: "SWIFT",
            bank_country_code: "CN",
            account_name: "12345678",
            account_number: "123456789",
            aba: "11122233A"
        })
        .expect(400)
        .end(function (err, res) {
            if (err) return done(err);
            expect(res.body.error).to.equal("'swift_code' is required when payment method is 'SWIFT'");
            done();
        });
});

it('swift code field is not mandatory when payment method is LOCAL', function (done) {
    api.post('/bank')
        .set('Accept', 'application/json')
        .send({
            payment_method: "LOCAL",
            bank_country_code: "CN",
            account_name: "12345678",
            account_number: "123456789",
            aba: "11122233A"
        })
        .expect(200)
        .end(function (err, res) {
          expect(res.body).to.have.property("success");
          expect(res.body.success).to.equal('Bank details saved');
            done();
        });
});

it('swift code 5th and 6th character must match bank country code', function (done) {
    api.post('/bank')
        .set('Accept', 'application/json')
        .send({
            payment_method: "SWIFT",
            bank_country_code: "CN",
            account_name: "12345678",
            account_number: "123456789",
            swift_code: "ICBCCVBJ",
            aba: "11122233A"
        })
        .expect(400)
        .end(function (err, res) {
            if (err) return done(err);
            expect(res.body.error).to.equal("The swift code is not valid for the given bank country code: CN");
            done();
        });
});

it('swift code can be 11 characters', function (done) {
    api.post('/bank')
        .set('Accept', 'application/json')
        .send({
            payment_method: "SWIFT",
            bank_country_code: "CN",
            account_name: "12345678",
            account_number: "123456789",
            swift_code: "ICBCCNBJGHJ",
            aba: "11122233A"
        })
        .expect(200)
        .end(function (err, res) {
          expect(res.body).to.have.property("success");
          expect(res.body.success).to.equal('Bank details saved');
            done();
        });
});

it('swift code can not be 9 characters', function (done) {
  console.log("This test failed due to requirement MisMatch, defect logged for the same. Once issue is fixed at API this test will automatically pass");
    api.post('/bank')
        .set('Accept', 'application/json')
        .send({
            payment_method: "SWIFT",
            bank_country_code: "CN",
            account_name: "12345678",
            account_number: "123456789",
            swift_code: "ICBCCNBJG",
            aba: "11122233A"
        })
        .expect(400)
        .end(function (err, res) {
            if (err) return done(err);
            expect(res.body.error).to.equal("Length of 'swift_code' should be either 8 or 11");
            done();
        });
});

it('bsb field is mandatory when bank country is AU', function (done) {
    api.post('/bank')
        .set('Accept', 'application/json')
        .send({
            payment_method: "LOCAL",
            bank_country_code: "AU",
            account_name: "12345678",
            account_number: "123456789",
            aba: "11122233A"
        })
        .expect(400)
        .end(function (err, res) {
            if (err) return done(err);
            expect(res.body.error).to.equal("'bsb' is required when bank country code is 'AU'");
            done();
        });
});

it('bsb field is not mandatory when bank country is not AU', function (done) {
    api.post('/bank')
        .set('Accept', 'application/json')
        .send({
            payment_method: "LOCAL",
            bank_country_code: "CN",
            account_name: "12345678",
            account_number: "123456789",
            aba: "11122233A"
        })
        .expect(200)
        .end(function (err, res) {
          expect(res.body).to.have.property("success");
          expect(res.body.success).to.equal('Bank details saved');
            done();
        });
});

it('bsb field must be 6 characters', function (done) {
    api.post('/bank')
        .set('Accept', 'application/json')
        .send({
            payment_method: "LOCAL",
            bank_country_code: "AU",
            account_name: "12345678",
            account_number: "123456789",
            aba: "11122233A",
            bsb: "12345"
        })
        .expect(400)
        .end(function (err, res) {
            if (err) return done(err);
            expect(res.body.error).to.equal("Length of 'bsb' should be 6");
            done();
        });
});

it('aba field is mandatory when bank country is US', function (done) {
  console.log("This test failed due to requirement MisMatch, defect logged for the same. Once issue is fixed at API this test will automatically pass");
    api.post('/bank')
        .set('Accept', 'application/json')
        .send({
            payment_method: "LOCAL",
            bank_country_code: "US",
            account_name: "12345678",
            account_number: "123456789"
        })
        .expect(400)
        .end(function (err, res) {
            if (err) return done(err);
            expect(res.body.error).to.equal("'aba' is required when bank country code is 'US'");
            done();
        });
});

it('aba field is not mandatory when bank country is not US', function (done) {
    api.post('/bank')
        .set('Accept', 'application/json')
        .send({
            payment_method: "LOCAL",
            bank_country_code: "CN",
            account_name: "12345678",
            account_number: "123456789",
        })
        .expect(200)
        .end(function (err, res) {
          expect(res.body).to.have.property("success");
          expect(res.body.success).to.equal('Bank details saved');
            done();
        });
});

it('aba field must be 9 characters', function (done) {
    api.post('/bank')
        .set('Accept', 'application/json')
        .send({
            payment_method: "LOCAL",
            bank_country_code: "US",
            account_name: "12345678",
            account_number: "123456789",
            aba: "111",
            bsb: "12345"
        })
        .expect(400)
        .end(function (err, res) {
            if (err) return done(err);
            expect(res.body.error).to.equal("Length of 'aba' should be 9");
            done();
        });
});

});
