package com.ALL_in_one.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component("localAdminAccess")
public class LocalAdminAccess {
    private final boolean cardEditorPublic;

    public LocalAdminAccess(@Value("${app.local-admin.card-editor-public:false}") boolean cardEditorPublic) {
        this.cardEditorPublic = cardEditorPublic;
    }

    public boolean isCardEditorPublic() {
        return cardEditorPublic;
    }
}
