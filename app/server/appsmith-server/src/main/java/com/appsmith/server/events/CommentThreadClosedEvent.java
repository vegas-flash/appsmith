package com.appsmith.server.events;

import com.appsmith.server.domains.Application;
import com.appsmith.server.domains.CommentThread;
import com.appsmith.server.domains.Workspace;
import lombok.Getter;

@Getter
public class CommentThreadClosedEvent extends AbstractCommentEvent {
    private final CommentThread commentThread;

    public CommentThreadClosedEvent(String authorUserName, Workspace organization, Application application, String originHeader, CommentThread commentThread, String pagename) {
        super(authorUserName, organization, application, originHeader, pagename);
        this.commentThread = commentThread;
    }
}
