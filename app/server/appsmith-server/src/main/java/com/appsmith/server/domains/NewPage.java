package com.appsmith.server.domains;

import com.appsmith.external.models.BaseDomain;
import com.appsmith.server.dtos.PageDTO;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@NoArgsConstructor
@Document
public class NewPage extends BaseDomain {

    String applicationId;

    PageDTO unpublishedPage;

    PageDTO publishedPage;

    public void sanitiseForExport() {
        this.setApplicationId(null);
        this.setId(null);
        if (this.getUnpublishedPage() != null) {
            this.getUnpublishedPage().sanitiseForExport();
        }
        if (this.getPublishedPage() != null) {
            this.getPublishedPage().sanitiseForExport();
        }
        this.sanitiseBaseDomainForExport();
    }
}
