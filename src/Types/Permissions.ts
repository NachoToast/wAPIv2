enum Permissions {
    /** This user can change other user's permissions (excluding this one). */
    AssignPermissions = 0,

    /** This user can modify post attributes, and accept/deny posts. */
    Audit = 1 << 0,

    /** This user can comment on posts. */
    Comment = 1 << 1,

    /** This user can submit posts (to be audited). */
    Upload = 1 << 2,
}

export default Permissions;
