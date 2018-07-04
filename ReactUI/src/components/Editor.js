import ListErrors from './ListErrors';
import React from 'react';
import agent from '../agent';
import { connect } from 'react-redux';
import {
  EDITOR_PAGE_LOADED,
  ARTICLE_SUBMITTED,
  EDITOR_PAGE_UNLOADED,
  UPDATE_FIELD_EDITOR
} from '../constants/actionTypes';

const mapStateToProps = state => ({
  ...state.editor
});

const mapDispatchToProps = dispatch => ({
  onLoad: payload =>
    dispatch({ type: EDITOR_PAGE_LOADED, payload }),
  onSubmit: payload =>
    dispatch({ type: ARTICLE_SUBMITTED, payload }),
  onUnload: payload =>
    dispatch({ type: EDITOR_PAGE_UNLOADED }),
  onUpdateField: (key, value) =>
    dispatch({ type: UPDATE_FIELD_EDITOR, key, value })
});

class Editor extends React.Component {
  constructor() {
    super();

    const updateFieldEvent =
      key => ev => this.props.onUpdateField(key, ev.target.value);

    this.changePosition = updateFieldEvent('position');
    this.changeDescription = updateFieldEvent('jobDescription');
    this.changeBand = updateFieldEvent('band');
    this.changeLocation = updateFieldEvent('location');
    this.changeHiringManager = updateFieldEvent('hiringManager');
    this.changeRecruiter = updateFieldEvent('recruiter');
    this.changeKeySkills = updateFieldEvent('keySkills');
    this.changeSecondarySkills = updateFieldEvent('secondarySkills');
    this.changeStartDate = updateFieldEvent('startDate');
    this.changeEndDate = updateFieldEvent('endDate');


    this.submitForm = ev => {
      ev.preventDefault();
      const job = {
        position: this.props.position,
        location: this.props.location,
        jobDescription: this.props.jobDescription,
        hiringManager: this.props.hiringManager,
        recruiter: this.props.recruiter,
        keySkills: this.props.keySkills,
        secondarySkills: this.props.secondarySkills,
        startDate: this.props.secondarySkills,
        endDate: this.props.secondarySkills,
      };
      console.log(job)
      const promise = agent.Articles.create(job);
      this.props.onSubmit(promise);
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.slug !== nextProps.match.params.slug) {
      if (nextProps.match.params.slug) {
        this.props.onUnload();
        return this.props.onLoad(agent.Articles.get(this.props.match.params.slug));
      }
      this.props.onLoad(null);
    }
  }

  componentWillMount() {
    if (this.props.match.params.slug) {
      return this.props.onLoad(agent.Articles.get(this.props.match.params.slug));
    }
    this.props.onLoad(null);
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    return (
      <div className="editor-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-10 offset-md-1 col-xs-12">

              <ListErrors errors={this.props.errors}></ListErrors>

              <form>
                <fieldset>

                  <fieldset className="form-group">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Position"
                      value={this.props.position}
                      onChange={this.changePosition} />
                  </fieldset>

                  <fieldset className="form-group">
                    <textarea
                      className="form-control"
                      type="text"
                      placeholder="Description"
                      value={this.props.jobDescription}
                      onChange={this.changeDescription} />
                  </fieldset>

                  <fieldset className="form-group">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Band"
                      value={this.props.band}
                      onChange={this.changeBand} />
                  </fieldset>

                  <fieldset className="form-group">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Location"
                      value={this.props.location}
                      onChange={this.changeLocation} />
                  </fieldset>

                  <fieldset className="form-group">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Hiring Manager"
                      value={this.props.hiringManager}
                      onChange={this.changeHiringManager} />
                  </fieldset>

                  
                  <fieldset className="form-group">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Recruiter"
                      value={this.props.recruiter}
                      onChange={this.changeRecruiter} />
                  </fieldset>


                  <fieldset className="form-group">
                    <input
                      className="form-control"
                      rows="8"
                      placeholder="keySkills"
                      value={this.props.keySkills}
                      onChange={this.changeKeySkills}>
                    </input>
                  </fieldset>

                  <fieldset className="form-group">
                    <input
                      className="form-control"
                      rows="8"
                      placeholder="Secondary Skills"
                      value={this.props.secondarySkills}
                      onChange={this.changeSecondarySkills}>
                    </input>
                  </fieldset>

                  <fieldset className="form-group">
                    <input
                      className="form-control"
                      rows="8"
                      placeholder="Start Date"
                      type="date"
                      value={this.props.startDate}
                      onChange={this.changeStartDate}>
                    </input>
                  </fieldset>

                  <fieldset className="form-group">
                    <input
                      className="form-control"
                      rows="8"
                      placeholder="End Date"
                      type="date"
                      value={this.props.endDate}
                      onChange={this.changeEndDate}>
                    </input>
                  </fieldset>

                  <button
                    className="btn btn-lg pull-xs-right btn-primary"
                    type="button"
                    disabled={this.props.inProgress}
                    onClick={this.submitForm}>
                    Publish Job
                  </button>

                </fieldset>
              </form>

            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Editor);
