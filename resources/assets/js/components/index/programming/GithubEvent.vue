<template>
    <div class="github-event">
        <octicon v-bind:label="eventMessage()" scale="2">
            <icon name="circle" scale="2"></icon>
            <octicon v-bind:name="eventIcon()" class="octicon-icon"></octicon>
        </octicon>
        <div class="github-content">
            <h4>
                <a v-bind:href="`https://github.com/${ghEvent.repo.name}`" v-bind:title="`View ${ghEvent.repo.name} on Github`">
                    {{ ghEvent.repo.name }}
                </a>
            </h4>
            <p>
                {{ eventMessage() }}
                <small v-if="ghEvent.payload.issue"> <a v-bind:href="ghEvent.payload.issue.html_url">View issue</a></small>
            </p>
            <ul class="github-commits" v-if="ghEvent.payload.commits">
                <li v-for="commit in ghEvent.payload.commits" v-bind:key="commit.sha">
                    <span className="octicon octicon-git-commit"></span>
                    {{ commit.message }}
                    <small><a v-bind:href="`https://github.com/${ghEvent.repo.name}/commit/${commit.sha}`" title="View Commit">View Commit</a></small>
                </li>
            </ul>
            <p class="relative-time"><small>{{ relativeTimeCreated() }}</small></p>
        </div>
    </div>
</template>

<script>
    import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';

    import Icon from 'vue-awesome/components/Icon';
    import 'vue-awesome/icons/circle';

    import Octicon from 'vue-octicon/components/Octicon.vue';
    import 'vue-octicon/icons/comment';
    import 'vue-octicon/icons/eye';
    import 'vue-octicon/icons/git-branch';
    import 'vue-octicon/icons/git-pull-request';
    import 'vue-octicon/icons/issue-closed';
    import 'vue-octicon/icons/issue-opened';
    import 'vue-octicon/icons/issue-reopened';
    import 'vue-octicon/icons/organization';
    import 'vue-octicon/icons/repo';
    import 'vue-octicon/icons/repo-push';
    import 'vue-octicon/icons/rocket';
    import 'vue-octicon/icons/star';
    import 'vue-octicon/icons/tag';
    import 'vue-octicon/icons/trashcan';

    export default {
        name: 'github-event',
        props: [
            'gh-event',
        ],
        components: {
            Octicon,
            Icon,
        },
        data() {
            return {
                eventIcon() {
                    if (this.ghEvent.type === 'PushEvent') {
                        return 'repo-push';
                    } else if (this.ghEvent.type === 'IssueCommentEvent') {
                        return 'comment';
                    } else if (this.ghEvent.type === 'DeleteEvent') {
                        return 'trashcan';
                    } else if (this.ghEvent.type === 'WatchEvent') {
                        if (this.ghEvent.payload.action === 'watched') {
                            return 'eye';
                        } else if (this.ghEvent.payload.action === 'started') {
                            return 'star';
                        }
                    } else if (this.ghEvent.type === 'IssuesEvent') {
                        if (this.ghEvent.payload.action === 'opened') {
                            return 'issue-opened';
                        } else if (this.ghEvent.payload.action === 'reopened') {
                            return 'issue-reopened';
                        } else if (this.ghEvent.payload.action === 'closed') {
                            return 'issue-closed';
                        }
                    } else if (this.ghEvent.type === 'CreateEvent') {
                        if (this.ghEvent.payload.ref_type === 'tag') {
                            return 'tag';
                        } else if (this.ghEvent.payload.ref_type === 'branch') {
                            return 'git-branch';
                        } else if (this.ghEvent.payload.ref_type === 'repository') {
                            return 'repo';
                        }
                    } else if (this.ghEvent.type === 'MemberEvent') {
                        if (this.ghEvent.payload.action === 'added') {
                            return 'organization';
                        }
                    } else if (this.ghEvent.type === 'PublicEvent') {
                        return 'rocket';
                    } else if (this.ghEvent.type === 'PullRequestEvent') {
                        return 'git-pull-request';
                    }
                    // else {
                    //     console.log(this.ghEvent.type); // eslint-disable-line
                    // }
                },
                eventMessage() {
                    if (this.ghEvent.type === 'PushEvent') {
                        return 'Pushed to repo';
                    } else if (this.ghEvent.type === 'IssueCommentEvent') {
                        return `Commented on Issue #${this.ghEvent.payload.issue.number}`;
                    } else if (this.ghEvent.type === 'DeleteEvent') {
                        return 'Deleted';
                    } else if (this.ghEvent.type === 'WatchEvent') {
                        if (this.ghEvent.payload.action === 'watched') {
                            return 'Watched repo';
                        } else if (this.ghEvent.payload.action === 'started') {
                            return 'Stared repo';
                        }
                    } else if (this.ghEvent.type === 'IssuesEvent') {
                        if (this.ghEvent.payload.action === 'opened') {
                            return `Opened issue #${this.ghEvent.payload.issue.number}`;
                        } else if (this.ghEvent.payload.action === 'reopened') {
                            return `Reopened issue #${this.ghEvent.payload.issue.number}`;
                        } else if (this.ghEvent.payload.action === 'closed') {
                            return `Closed issue #${this.ghEvent.payload.issue.number}`;
                        }
                    } else if (this.ghEvent.type === 'CreateEvent') {
                        if (this.ghEvent.payload.ref_type === 'tag') {
                            return 'Tagged repo';
                        } else if (this.ghEvent.payload.ref_type === 'branch') {
                            return `Created Branch ${this.ghEvent.payload.ref}`;
                        } else if (this.ghEvent.payload.ref_type === 'repository') {
                            return `Created ${this.ghEvent.payload.ref_type}`;
                        }
                    } else if (this.ghEvent.type === 'MemberEvent') {
                        if (this.ghEvent.payload.action === 'added') {
                            return 'Added collaborator';
                        }
                    } else if (this.ghEvent.type === 'PublicEvent') {
                        return 'Made Public';
                    } else if (this.ghEvent.type === 'PullRequestEvent') {
                        return 'Pull Request';
                    }
                },
                relativeTimeCreated() {
                    const relativeTime = distanceInWordsToNow(this.ghEvent.created_at, {
                        includeSeconds: true,
                        addSuffix: true,
                    });
                    return relativeTime;
                },
            }
        },
    }
</script>

<style scoped>
    .octicon {
        display: block;
        margin: 0 auto;
    }
    .octicon-icon {
        fill: #333;
    }

    p {
        margin: 5px 0;
    }

    .github-content h4 {
        margin-bottom: 0;
    }

    .relative-time {
        margin: 0;
    }
</style>
