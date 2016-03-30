function queryProyection(options) {

  var proyection = {
    'category_code': 1,
    'name': 1, _id: 0,
    'founded_year': 1,
    'number_of_employees': 1
  }

  if ('overview' in options) {
    proyection.overview = 1
  };

  if ('milestones' in options) {
    proyection['milestones.source_description'] = 1
  };

  if ('ipo' in options) {
    proyection['ipo.valuation_amount'] = 1
  };

  if ('country' in options) {
    proyection['offices.country_code'] = 1
  };

  return proyection
}

module.exports = queryProyection
