import React, { ChangeEvent } from 'react'
import styled from 'styled-components'
import { X as XIcon } from '@styled-icons/feather'
import { ActiveList } from 'src/custom-lists/ui/CollectionPicker/components/ActiveList'

interface Props {
    dataAttributeName: string
    entriesSelected: string[]
    onPress: (entry: string) => void
}

export class EntrySelectedList extends React.PureComponent<Props> {
    private get dataAttribute(): string {
        return `data-${this.props.dataAttributeName}`
    }

    handleSelectedTabPress = (event: ChangeEvent) =>
        this.props.onPress(event.target.getAttribute(this.dataAttribute))

    render() {
        return (
            <React.Fragment>
                {this.props.entriesSelected?.map((entry) => (
                    <StyledActiveEntry
                        key={`ActiveTab-${entry}`}
                        onClick={this.handleSelectedTabPress}
                        {...{ [this.dataAttribute]: entry }} // Need to set a dynamic prop here
                    >
                        <Entry>{entry}</Entry>
                        <StyledXIcon size={12} />
                    </StyledActiveEntry>
                ))}
            </React.Fragment>
        )
    }
}

const StyledActiveEntry = styled(ActiveList)`
    display: inline-flex;
    cursor: pointer;
    max-width: 100%;
`

const Entry = styled.div`
    display: block;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow-x: hidden;
    text-overflow: ellipsis;
`

const StyledXIcon = styled(XIcon)`
    stroke: ${(props) => props.theme.tag.text};
    stroke-width: 2px;
    margin-left: 4px;
    display: flex;
    flex-shrink: 0;
    pointer-events: none;

    &:hover {
        stroke-width: 3px;
        stroke: darken(0.2, ${(props) => props.theme.tag.text});
    }
`
