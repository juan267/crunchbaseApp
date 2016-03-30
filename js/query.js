function queryDocument(options){
  var query = {
    'founded_year': {
      $gte: options.firstYear,
      $lte: options.lastYear
    }
  }

  if ('employees' in options) {
    query.number_of_employees = {
      $lte: options.employees
    }
  };

  if('overview' in options) {
    query.overview = {
      $regex: options.overview,
      $options: 'i'
    }
  }

  if ('milestones' in options) {
    query['milestones.source_description'] = {
      $regex: options.milestones,
      $options: 'i'
    }
  };

  if ('ipo' in options) {
    if (options.ipo === 'yes') {
      query['ipo.valuation_amount'] = {$exists: true, $ne: null}
    } else if(options.ipo === 'no') {
      query['ipo.valuation_amount'] = null
    }
  };

  if ('country' in options) {
    query['offices.country_code'] = options.country
  };

  return query
}

module.exports = queryDocument
