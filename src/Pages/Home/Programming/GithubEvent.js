import React, { Component } from 'react';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faCircle from '@fortawesome/fontawesome-free-solid/faCircle';

import Octicon from 'octicons-modular/react';
import 'octicons-modular/react/style.css';
import comment from 'octicons-modular/icons/comment';
import eye from 'octicons-modular/icons/eye';
import gitBranch from 'octicons-modular/icons/git-branch';
import gitCommit from 'octicons-modular/icons/git-commit';
import gitPullRequest from 'octicons-modular/icons/git-pull-request';
import issueClosed from 'octicons-modular/icons/issue-closed';
import issueOpened from 'octicons-modular/icons/issue-opened';
import issueReopened from 'octicons-modular/icons/issue-reopened';
import organization from 'octicons-modular/icons/organization';
import repo from 'octicons-modular/icons/repo';
import repoPush from 'octicons-modular/icons/repo-push';
import repoForked from 'octicons-modular/icons/repo-forked';
import rocket from 'octicons-modular/icons/rocket';
import star from 'octicons-modular/icons/star';
import tag from 'octicons-modular/icons/tag';
import trashcan from 'octicons-modular/icons/trashcan';

import styled from 'styled-components';

const GithubEventContainer = styled.div`
  margin-bottom: 55px;
  text-align: center;
`;
const GithubIcon = styled.span`
  display: block;
  margin: 0 auto;
  & .octicon {
    color: #333;
    position: relative;

    &.octicon-star {
      top: -2px;
      left: 1.5px;
    }
    &.octicon-comment {
      left: 1.5px;
    }
    &.octicon-repo-push {
      top: -1px;
      left: 1px;
    }
  }
`;
const GithubTitle = styled.h4`
  margin-bottom: 0;
`;
const GithubText = styled.p`
  margin: 5px 0;
`;
const GithubTime = styled.p`
  margin: 0;
`;
const GithubCommitList = styled.ul`
  list-style: none;
  padding-left: 15px;

  & .octicon-git-commit {
    padding-right: 10px;
  }
`;

class GithubEvent extends Component {
  event() {
    if (this.props.ghevent.type === 'PushEvent') {
      return {
        icon: repoPush,
        message: 'Pushed to repo'
      };
    } else if (this.props.ghevent.type === 'IssueCommentEvent') {
      return {
        icon: comment,
        message: `Commented on Issue #${this.props.ghevent.payload.issue.number}`
      };
    } else if (this.props.ghevent.type === 'DeleteEvent') {
      return {
        icon: trashcan,
        message: 'Deleted'
      };
    } else if (this.props.ghevent.type === 'WatchEvent') {
      if (this.props.ghevent.payload.action === 'watched') {
        return {
          icon: eye,
          message: 'Watched repo'
        };
      } else if (this.props.ghevent.payload.action === 'started') {
        return {
          icon: star,
          message: 'Stared repo'
        };
      }
    } else if (this.props.ghevent.type === 'IssuesEvent') {
      if (this.props.ghevent.payload.action === 'opened') {
        return {
          icon: issueOpened,
          message: `Opened issue #${this.props.ghevent.payload.issue.number}`
        };
      } else if (this.props.ghevent.payload.action === 'reopened') {
        return {
          icon: issueReopened,
          message: `Reopened issue #${this.props.ghevent.payload.issue.number}`
        };
      } else if (this.props.ghevent.payload.action === 'closed') {
        return {
          icon: issueClosed,
          message: `Closed issue #${this.props.ghevent.payload.issue.number}`
        };
      }
    } else if (this.props.ghevent.type === 'CreateEvent') {
        if (this.props.ghevent.payload.ref_type === 'tag') {
            return {
              icon: tag,
              message: 'Tagged repo'
            };
        } else if (this.props.ghevent.payload.ref_type === 'branch') {
            return {
              icon: gitBranch,
              message: `Created Branch ${this.props.ghevent.payload.ref}`
            };
        } else if (this.props.ghevent.payload.ref_type === 'repository') {
            return {
              icon: repo,
              message: `Created ${this.props.ghevent.payload.ref_type}`
            };
        }
    } else if (this.props.ghevent.type === 'MemberEvent') {
        if (this.props.ghevent.payload.action === 'added') {
            return {
              icon: organization,
              message: 'Added collaborator'
            };
        }
    } else if (this.props.ghevent.type === 'PublicEvent') {
        return {
          icon: rocket,
          message: 'Made Public'
        };
    } else if (this.props.ghevent.type === 'PullRequestEvent') {
        return {
          icon: gitPullRequest,
          message: 'Pull Request'
        };
    } else if (this.props.ghevent.type === 'ForkEvent') {
      return {
        icon: repoForked,
        message: 'Forked'
      };
    } else {
        console.log(this.props.ghevent.type); // eslint-disable-line
        return {
          icon: rocket,
          message: 'Unknown'
        };
    }
  }

  relativeTimeCreated() {
    const relativeTime = distanceInWordsToNow(this.props.ghevent.created_at, {
      includeSeconds: true,
      addSuffix: true,
    });
    return relativeTime;
  }

  render() {
    let commits = () => (null);
    if (this.props.ghevent.payload.commits) {
      commits = () => (
        <GithubCommitList>
          {
            this.props.ghevent.payload.commits.map((commit) => 
              <li key={commit.sha}>
                <Octicon icon={gitCommit} />
                {commit.message}
                <small> <a href={`https://github.com/${this.props.ghevent.repo.name}/commit/${commit.sha}`} title="View Commit">View Commit</a></small>
              </li>
            )
          }
        </GithubCommitList>
      );
    }

    return (
      <GithubEventContainer>
        <GithubIcon className={`fa-layers fa-fw fa-3x ${this.props.className}`}>
          <FontAwesomeIcon icon={faCircle} size="lg" />
          <Octicon icon={this.event().icon} scale={2} />
        </GithubIcon>
        <div className="github-content">
          <GithubTitle>
            <a href={`https://github.com/${this.props.ghevent.repo.name}`} title={`View ${this.props.ghevent.repo.name} on Github`}>
              { this.props.ghevent.repo.name }
            </a>
          </GithubTitle>
          <GithubText>
            { this.event().message }
            { (this.props.ghevent.payload.issue) ? <small> <a href={this.props.ghevent.payload.issue.html_url}>View issue</a></small> : null }
          </GithubText>
          {commits()}
          <GithubTime><small>{ this.relativeTimeCreated() }</small></GithubTime>
        </div>
      </GithubEventContainer>
    );
  }
};

export default GithubEvent;